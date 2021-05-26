import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import CreateIcon from "@material-ui/icons/Create";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import FacultySelect from "./FacultySelect";
import PersonIcon from '@material-ui/icons/Person';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    textAlign: "center",
  },
  dialogContent: {
    fontSize: "20px",
    fontWeight: "500",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
}));

function AddSubject(props) {
  const classes = useStyles();

  const [value, setValue] = useState();
  const [personName, setPersonName] = React.useState([]);

  
  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const handleClick = (e) => {
    setValue(e.target.value);
  };
  console.log(props)
  console.log(value)
  console.log(personName);

  const submitHandler = (e) => {
    axios
      .patch("/admin/add-subject", {
        deptName: props.deptName,
        sem: props.sem,
        div: props.div,
        subjectName:value,
        faculty:personName
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
    props.handleClose();
    e.preventDefault();
  };
  return (
    <div>
      <Dialog
        open={props.open}
        fullWidth={true}
        maxWidth="sm"
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
          {" "}
          {props.deptName}{" "}
        </DialogTitle>
        <form className={classes.form} onSubmit={submitHandler}>
          <DialogContent>
            <DialogContentText className={classes.dialogContent}>
              Semester {props.sem} {"  "} Div {props.div}
            </DialogContentText>

            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <CreateIcon color="primary" />
              </Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="Subject Name"
                  value={value}
                  onChange={handleClick}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <PersonIcon color="primary" />
              </Grid>
              <Grid item>
                <FacultySelect personName={personName} handleChange={handleChange}/>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
export default AddSubject;
