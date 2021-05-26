import React,{useState} from 'react'
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    link: {
      cursor: "pointer",
    },
  }));
function ChangePass() {

    const classes = useStyles();
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
  
    const handlePass = (e) => {
      setPass(e.target.value);
    };
  
    const handleConfirmPass = (e) => {
      setConfirmPass(e.target.value);
    };
  
    const handleSubmit = (e) => {
        axios.post("/auth/changePass",{
            password:confirmPass,
        })
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
      e.preventDefault();
    };

    return (
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} color="primary">
          <LockOutlinedIcon  />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="pass"
            label="Password"
            name="pass"
            type="password"
            value={pass}
            onChange={handlePass}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Confirmpass"
            label="Confirm Password"
            type="password"
            id="password"
            // autoComplete="current-password"
            value={confirmPass}
            onChange={handleConfirmPass}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}>
            Save
          </Button>
        </form>
      </div>
    </Container>
    )
}

export default ChangePass
