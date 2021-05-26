import React,{useState} from "react";
import List from "./List";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import AddDept from "./AddDept";

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: "fixed",
    bottom: theme.spacing(2),   
    right: theme.spacing(3),
  },
}));


function Department() {
  const classes = useStyles();
  const [addDept,setAddDept] = useState(false);

  const handleClickOpen = (name) => {
    setAddDept(true);
  };

  const handleClose = () => {
    setAddDept(false);
  };


  return (
    <div>
      <List />
      <Tooltip title="Add Department" aria-label="add">
        <Fab color="primary" className={classes.absolute} onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </Tooltip>
      {addDept && (
        <AddDept
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          open={addDept}
        />
      )}
    </div>
  );
}
export default Department;
