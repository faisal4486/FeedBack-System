const Router = require("express").Router;
const db = require("../db");
const router = Router();
const Sentiment = require("sentiment");
const sentiment = new Sentiment();

// router.get("/", () => {});

router.post("/analysis",(req,res,next)=>{
  var result = sentiment.analyze(req.body.remark);
  console.log(result);
})

router.get(
  "/faculty_evaluation/:dept/:sem/:div/:subject/:faculty",
  (req, res) => {
    db.getDb()
      .db()
      .collection("faculty_evaluation")
      .find({
        student_course: req.params.dept,
        student_sem: parseInt(req.params.sem),
        student_div: req.params.div,
        subject_name: req.params.subject,
        faculty_name: req.params.faculty,
        isValid: true,
      })
      .toArray()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

router.get("/Positiveremark/:dept/:sem/:div/:subject/:faculty", (req, res) => {
  db.getDb()
    .db()
    .collection("faculty_evaluation")
    .find(
      {
        student_course: req.params.dept,
        student_sem: parseInt(req.params.sem),
        student_div: req.params.div,
        subject_name: req.params.subject,
        faculty_name: req.params.faculty,
        score:{$gte:0},
        isValid: true,
      },
      { projection: { remark: 1, _id: 0 } }
    )
    .sort({score:-1})
    .toArray()
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});


router.get("/Negativeremark/:dept/:sem/:div/:subject/:faculty", (req, res) => {
  db.getDb()
    .db()
    .collection("faculty_evaluation")
    .find(
      {
        student_course: req.params.dept,
        student_sem: parseInt(req.params.sem),
        student_div: req.params.div,
        subject_name: req.params.subject,
        faculty_name: req.params.faculty,
        score:{$lt:0},
        isValid: true,
      },
      { projection: { remark: 1, _id: 0 } }
    )
    .sort({score:-1})
    .toArray()
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/student_evaluation/:course/:sem/:div", (req, res) => {
  let maxscore1,
    maxscore2,
    maxscore3,
    maxscore4,
    maxscore5,
    PR,
    PC,
    PSA,
    PA,
    PE,
    PNR,
    PNC,
    PNSA,
    PNA,
    PNE,
    P,
    PN,
    ME,
    valid,
    invalid = 0;

  db.getDb()
    .db()
    .collection("student_evaluation")
    .find(
      {
        student_course: req.params.course,
        student_sem: parseInt(req.params.sem),
        student_div: req.params.div,
      },
      { projection: { qts1: 1, _id: 0 } }
    )
    .sort({ qts1: -1 })
    .limit(1)
    .toArray()
    .then((result) => {
      maxscore1 = result[0].qts1;
      console.log(maxscore1);
      // res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });

  db.getDb()
    .db()
    .collection("student_evaluation")
    .find(
      {
        student_course: req.params.course,
        student_sem: parseInt(req.params.sem),
        student_div: req.params.div,
      },
      { projection: { qts2: 1, _id: 0 } }
    )
    .sort({ qts2: -1 })
    .limit(1)
    .toArray()
    .then((result) => {
      maxscore2 = result[0].qts2;
      console.log(maxscore2);
      // res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });

  db.getDb()
    .db()
    .collection("student_evaluation")
    .find(
      {
        student_course: req.params.course,
        student_sem: parseInt(req.params.sem),
        student_div: req.params.div,
      },
      { projection: { qts3: 1, _id: 0 } }
    )
    .sort({ qts3: -1 })
    .limit(1)
    .toArray()
    .then((result) => {
      maxscore3 = result[0].qts3;
      console.log(maxscore3);
      // res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });

  db.getDb()
    .db()
    .collection("student_evaluation")
    .find(
      {
        student_course: req.params.course,
        student_sem: parseInt(req.params.sem),
        student_div: req.params.div,
      },
      { projection: { qts4: 1, _id: 0 } }
    )
    .sort({ qts4: -1 })
    .limit(1)
    .toArray()
    .then((result) => {
      maxscore4 = result[0].qts4;
      console.log(maxscore4);
      // res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });

  db.getDb()
    .db()
    .collection("student_evaluation")
    .find(
      {
        student_course: req.params.course,
        student_sem: parseInt(req.params.sem),
        student_div: req.params.div,
      },
      { projection: { qts5: 1, _id: 0 } }
    )
    .sort({ qts5: -1 })
    .limit(1)
    .toArray()
    .then((result) => {
      maxscore5 = result[0].qts5;
      console.log(maxscore5);
    })
    .catch((err) => {
      console.log(err);
    });

  db.getDb()
    .db()
    .collection("student_evaluation")
    .find({
      student_course: req.params.course,
      student_sem: parseInt(req.params.sem),
      student_div: req.params.div,
    })
    .toArray()
    .then((result) => {
      result.map((item) => {
        PC = item.qts1 / maxscore1;
        PR = item.qts2 / maxscore2;
        PE = item.qts3 / maxscore3;
        PA = item.qts5 / maxscore5;
        PSA = PR * 0.25 + PC * 0.25 + PA * 0.25 + PE * 0.25;
        // console.log(PR,PC,PA,PE,PSA);
        PNR = 1 - PR;
        PNC = 1 - PC;
        PNA = 1 - PA;
        PNE = 1 - PE;
        PNSA = 1 - PSA;
        P = PR * PC * PA * PE * PSA * 0.5;
        PN = PNR * PNC * PNA * PNE * PNSA * 0.5;
        ME = P + PN;
        valid = P / ME;
        invalid = PN / ME;
        if (valid >= invalid) {
          db.getDb()
            .db()
            .collection("faculty_evaluation")
            .updateMany(
              {
                student_id: item.student_id,
                student_first_name: item.student_first_name,
                student_last_name: item.student_last_name,
                student_course: item.student_course,
                student_div: item.student_div,
                student_sem: item.student_sem,
                student_batch: item.student_batch,
              },
              {
                $set: {
                  isValid: true,
                },
              }
            )
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
        } else {
          db.getDb()
            .db()
            .collection("faculty_evaluation")
            .updateMany(
              {
                student_id: item.student_id,
                student_first_name: item.student_first_name,
                student_last_name: item.student_last_name,
                student_course: item.student_course,
                student_div: item.student_div,
                student_sem: item.student_sem,
                student_batch: item.student_batch,
              },
              {
                $set: {
                  isValid: false,
                },
              }
            )
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});


router.post("/add_faculty", (req, res, next) => {
  const newData = {
    faculty_id: req.body.faculty_id,
    faculty_name: req.body.faculty_name,
    faculty_dept: req.body.faculty_dept,
  };

  db.getDb()
    .db()
    .collection("faculty_details")
    .insertOne(newData)
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "faculty added successfully",
        productId: result.insertedId,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "An error Occuired" });
    });
});

module.exports = router;
