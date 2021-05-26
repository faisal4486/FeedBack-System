const Router = require("express").Router;
const mongodb = require("mongodb");
const db = require("../db");
const Sentiment = require("sentiment");
const sentiment = new Sentiment();

const router = Router();

const ObjectId = mongodb.ObjectId;
 
router.get("/student_details/:student_id", (req,res,next) => {
  console.log(req.params)
  db.getDb()
  .db()
  .collection('student_details')
  .find({
    student_id:parseInt(req.params.student_id),
    // batch:req.params.batch,
  })
  .toArray()
  .then((result)=>{
    res.json(result)
  })
  .catch(err=>{
    console.log(err);
  })  
});  

router.get("/faculty_id/:faculty_name",(req,res)=>{
  db.getDb()
  .db()
  .collection("faculty_details")
  .find({faculty_name:req.params.faculty_name})
  .toArray()
  .then((result) => {
    console.log(result);
     res.send(result);
  })
  .catch((err) => {
    console.log(err);
    res.send(err)
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
      { projection: { subjects: 1,  _id: 0 } }
    )
    .toArray()
    .then((result) => {
      res.json(result);
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/student_evaluation", (req, res, next) => {
  let today = new Date();
  let  date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const newData = {
    student_id: req.body.student_id,
    student_first_name: req.body.student_first_name,
    student_last_name: req.body.student_last_name,
    student_batch: req.body.student_batch,
    student_rollno:req.body.student_rollno,
    student_sem: req.body.student_sem,
    student_dept: req.body.student_dept,
    student_div: req.body.student_div,
    date: date,
    qts1: req.body.qts1,
    qts2: req.body.qts2,
    qts3: req.body.qts3,
    qts4: req.body.qts4,
    qts5: req.body.qts5,
  };
  db.getDb()
  .db()
  .collection("student_evaluation")
  .insertOne(newData)
  .then(result=>{
    console.log(result),
    res.status(201).json({"message":"Data added succesfully" , productId : result.insertedId})
  })
  .catch(err=>{
    console.log(err),
    res.status(500).json({"message":"An error Occurred." })
  })
});

router.post("/student_details", (req, res, next) => {
  const newStudent = {
    student_id: req.body.student_id,
    student_name: req.body.student_name,
    student_batch: req.body.student_batch,
    student_roll_no: req.body.student_roll_no,
    student_division: req.body.student_division,
    student_dept : req.body.student_dept,
    student_sem : req.body.student_sem
  };
  db.getDb()
    .db()
    .collection("student_details")
    .insertOne(newStudent)
    .then((result) => {
      console.log(result);
      res
        .status(201)
        .json({ message: "Student added", productId: result.insertedId });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "An error occurred." });
    });
});



router.post("/student_feedback", (req, res, next) => {
  var result = sentiment.analyze(req.body.remark);
  // res.send(result);
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
   
  const feedback = {
    "qts1":parseFloat( req.body.student_feedback.qts1),
    "qts2":parseFloat( req.body.student_feedback.qts2),
    "qts3":parseFloat( req.body.student_feedback.qts3),
    "qts4":parseFloat( req.body.student_feedback.qts4),
    "qts5":parseFloat( req.body.student_feedback.qts5),
    "qts6":parseFloat( req.body.student_feedback.qts6),
    "qts7":parseFloat( req.body.student_feedback.qts7),
    "qts8":parseFloat( req.body.student_feedback.qts8),
    "qts9":parseFloat( req.body.student_feedback.qts9),
    "qts10":parseFloat( req.body.student_feedback.qts10),
  }


  const newData = {
    student_course: req.body.student_course,
    student_id: req.body.student_id,
    student_first_name: req.body.student_first_name,
    student_last_name:req.body.student_last_name,
    student_batch: req.body.student_batch,
    student_sem: req.body.student_sem,
    student_div: req.body.student_div,
    subject_name: req.body.subject_name,
    faculty_name: req.body.faculty_name,
    faculty_id: req.body.faculty_id ,
    student_feedback: feedback,
    remark:req.body.remark,
    date: date,
    score: result.score,
  };

  
  db.getDb()
  .db()
  .collection("faculty_details")
  .find({faculty_name:req.body.faculty_name})
  .toArray()
  .then((result) => {
    console.log(result);
    newData.faculty_id = result.faculty_id
  })
  .catch((err) => {
    console.log(err);
   
  });  

  db.getDb()
    .db()
    .collection("faculty_evaluation")
    .insertOne(newData)
    .then((result) => {
      console.log(result);
      res.status(201)
        .json({
          message: "Data Added Successfully",
          ProductId: result.insertedId,
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "An Error Occuried" });
    });
    
});

module.exports = router;
