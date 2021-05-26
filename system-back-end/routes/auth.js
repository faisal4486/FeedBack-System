const Router = require("express").Router;
const router = Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res, next) => {
  db.getDb()
    .db()
    .collection("student_details")
    .find({
      student_id: parseInt(req.body.id),
      firstname: req.body.firstname.toUpperCase,
      lastname: req.body.lastname.toUpperCase,
    })
    .toArray()
    .then((result) => {
      db.getDb()
        .db()
        .collection("student_login")
        .find({ student_id: req.body.id })
        .toArray()
        .then((result) => {
          if (result.length > 0) {
            res.send("User Already exist");
            console.log("user exist");
          } else {
            bcrypt.hash(req.body.password, 12, (err, hash) => {
              if (hash) {
                db.getDb()
                  .db()
                  .collection("student_login")
                  .insertOne({
                    student_id: parseInt(req.body.id),
                    student_email: req.body.email,
                    password: hash,
                  })
                  .then((result) => {
                    console.log(result);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                console.log(err);
              }
            });
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/login/:id/:password", (req, res, next) => {
  console.log(req.params);
  db.getDb()
    .db()
    .collection("student_login")
    .find({
      student_id: parseInt(req.params.id),
    })
    .toArray()
    .then((result) => {
      console.log(result);
      if (result.length > 0) {
        bcrypt.compare(
          req.params.password,
          result[0].password,
          function (err, result) {
            if (err) {
              res.send(err);
              console.log(err);
            }
            if (result) {
              let studentToken;
              try {
                studentToken = jwt.sign(
                  { student_id: parseInt(req.params.id) },
                  "supersecret_dont_share",
                  { expiresIn: "1h" }
                );
              } catch (err) {
                res.send("Token not generated");
              }

              res.status(201).json({
                student_id: parseInt(req.params.id),
                studentToken: studentToken,
              });
            } else {
              res.send("Invalid Password");
            }
          }
        );
      } else {
        res.send("Invalid UserId");
      }
    })
    .catch((err) => console.log(err));
});

router.get("/admin/login/:id/:password", (req, res, next) => {
  db.getDb()
    .db()
    .collection("admin_login")
    .find({
      admin_id: req.params.id,
    })
    .toArray()
    .then((result) => {
      console.log(result);
      if (result.length > 0) {
        bcrypt.compare(
          req.params.password,
          result[0].password,
          function (err, result) {
            if (err) {
              res.send(err);
              console.log(err);
            }
            if (result) {
              let adminToken;
              try {
                adminToken = jwt.sign(
                  { admin_id: req.params.id },
                  "supersecret_dont_share",
                  { expiresIn: "1h" }
                );
              } catch (err) {
                res.send("Token not generated");
              }

              res.status(201).json({
                admin_id: req.params.id,
                adminToken: adminToken,
              });
            } else {
              res.send("Invalid Password");
            }
          }
        );
      } else {
        res.send("Invalid UserId");
      }
    })
    .catch((err) => console.log(err));
});

router.post("/changePass", (req, res) => {
  bcrypt.hash(req.body.password, 12, (err, hash) => {
    if (hash) {
      db.getDb()
        .db()
        .collection("admin_login")
        .updateOne({}, { $set: { password: hash } })
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
    } else {
      console.log(err);
    }
  });
});

router.post("/adminlogin", (req, res, next) => {
  bcrypt.hash(req.body.password, 12, (err, hash) => {
    if (hash) {
      db.getDb()
        .db()
        .collection("admin_login")
        .insertOne({
          admin_id: req.body.admin_id,
          password: hash,
        })
        .then((result) => {
          console.log(result);
          res.send(result);
        })
        .catch((err) => console.log(err));
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
