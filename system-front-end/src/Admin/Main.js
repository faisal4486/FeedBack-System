import React from "react";
import Home from "./Pages/Home.js";
import Department from "./Pages/Department.js";
import Report from "./Pages/Report.js";
import ChangePass from "./Pages/ChangePass"

const Main = (props) => {

  if (props.name === "Home") {
    return <Home />;
  }
  if (props.name === "Department") {
    return <Department />;
  }
  if (props.name === "Report") {
    return <Report />;
  }
  if (props.name === "Reset") {
    return <ChangePass />;
  }
};

export default Main;
