// const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const studentRoutes = require("./routes/student");
const facultyRoutes = require("./routes/faculty");
const adminRoutes = require("./routes/admin");
const auth = require("./routes/auth");

const db = require("./db");
const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/student", studentRoutes);
app.use("/faculty", facultyRoutes);
app.use("/admin", adminRoutes);
app.use("/auth",auth);

db.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(8000, () => {
      console.log("Server is Running on Port 8000");
    });
  }
});
