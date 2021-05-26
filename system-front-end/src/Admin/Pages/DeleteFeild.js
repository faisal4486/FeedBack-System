import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteFeild(props) {
 
    const deleteConfirmation = (value) =>{
      return(()=>{
          props.handleDeleteClose(value)
      })
    };

  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={deleteConfirmation}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Do you want delete these particular feild ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           Once the particular Feild is delete all data will get Lost in that Feild.
           Press Ok to continue or press cancel to discard changes. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteConfirmation(false)} color="primary">
           Cancel
          </Button>
          <Button onClick={deleteConfirmation(true)} color="primary">
           Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
