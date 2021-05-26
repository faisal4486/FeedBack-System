const Router = require("express").Router;
const router = Router();
const db = require("../db");

router.get("/dept", (req, res) => {
  db.getDb()
    .db()
    .collection("dept")
    .distinct("deptName")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/sem/:deptName", (req, res) => {
  db.getDb()
    .db()
    .collection("dept")
    .distinct("semester", { deptName: req.params.deptName })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/div/:deptName/:sem", (req, res) => {
  // console.log(req.params)
  db.getDb()
    .db()
    .collection("dept")
    .find(
      { deptName: req.params.deptName, semester: parseInt(req.params.sem) },
      { projection: { div: 1, isOpen: 1, _id: 0 } }
    )
    .toArray()
    .then((result) => {
      // console.log(result);

      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/subjects/:deptName/:sem/:div", (req, res) => {
  // console.log(req.params)
  db.getDb()
    .db()
    .collection("dept")
    .find(
      {
        deptName: req.params.deptName,
        semester: parseInt(req.params.sem),
        div: req.params.div,
      },
      { projection: { subjects: 1, isOpen: 1, _id: 0 } }
    )
    .toArray()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/add-dept", (req, res) => {
  const newDept = {
    deptName: req.body.deptName,
    semester: 1,
    div: "A",
    subjects: [],
  };
  db.getDb()
    .db()
    .collection("dept")
    .insertOne(newDept)
    .then((result) => {
      console.log(result);
      res.status(201).json({ message: "data inserted succesfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "An error Occurred" });
    });
});

router.post("/add-sem", (req, res) => {
  const newSem = {
    deptName: req.body.deptName,
    semester: parseInt(req.body.sem),
    div: "A",
    subjects: [],
  };
  db.getDb()
    .db()
    .collection("dept")
    .insertOne(newSem)
    .then((result) => {
      console.log(result);
      res.status(201).json({ message: "data inserted succesfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "An error Occurred" });
    });
});

router.post("/add-div", (req, res) => {
  const newDiv = {
    deptName: req.body.deptName,
    semester: parseInt(req.body.sem),
    div: req.body.div,
    subjects: [],
  };
  db.getDb()
    .db()
    .collection("dept")
    .insertOne(newDiv)
    .then((result) => {
      console.log(result);
      res.status(201).json({ message: "data inserted succesfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "An error Occurred" });
    });
});

router.patch("/add-subject", (req, res) => {
  db.getDb()
    .db()
    .collection("dept")
    .updateOne(
      {
        deptName: req.body.deptName,
        semester: parseInt(req.body.sem),
        div: req.body.div,
      },
      {
        $addToSet: {
          subjects: {
            subjectName: req.body.subjectName,
            faculty: [req.body.faculty],
          },
        },
      }
    )
    .then((result) => {
      console.log(result);
      res.status(201).json({ message: "data update succesfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "An error Occurred" });
    });
});

router.post("/add-faculty", (req, res) => {
  db.getDb()
    .db()
    .collection("dept")
    .updateOne(
      {
        deptName: req.body.deptName,
        "subjects.subjectName": req.body.subjectName,
      },
      {
        $addToSet: {
          "subjects.$[el].faculty": req.body.faculty,
        },
      },
      {
        arrayFilters: [{ "el.subjectName": req.body.subjectName }],
      }
    )
    .then((result) => {
      console.log(result);
      res.status(201).json({ message: "Data updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "An error Occurred " });
    });
});

router.post("/remove-faculty", (req, res) => {
  console.log(req.body)
  db.getDb()
    .db()
    .collection("dept")
    .updateOne(
      {
        deptName: req.body.deptName,
        semester:parseInt(req.body.semester),
        div: req.body.div,
        "subjects.subjectName": req.body.subjectName,
      },
      {
        $pull: {
          "subjects.$[el].faculty": req.body.faculty,
        },
      },
      {
        arrayFilters: [{ "el.subjectName": req.body.subjectName }],
      }
    )
    .then((result) => {
      console.log(result);
      res.status(201).json({ message: "Data updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "An error Occurred" });
    });
});

router.post("/remove-subject", (req, res) => {
  db.getDb()
    .db()
    .collection("dept")
    .updateOne(
      {
        deptName: req.body.deptName,
        semester: req.body.semester,
        div: req.body.div,
        "subjects.subjectName": req.body.subjectName,
      },
      { $pull: { subjects: { subjectName: req.body.subjectName } } }
    )
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/remove-div", (req, res) => {
  console.log(req.body);
  db.getDb()
    .db()
    .collection("dept")
    .deleteOne({
      deptName: req.body.deptName,
      semester: parseInt(req.body.semester),
      div: req.body.div,
    })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/remove-sem", (req, res) => {
  db.getDb()
    .db()
    .collection("dept")
    .deleteMany({
      deptName: req.body.deptName,
      semester: parseInt(req.body.semester),
    })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/remove-dept", (req, res) => {
  db.getDb()
    .db()
    .collection("dept")
    .deleteMany({
      deptName: req.body.deptName,
    })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
