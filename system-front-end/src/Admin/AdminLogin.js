import React, { useState ,useContext} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import { Link } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';
import { AdminAuthContext } from "../Auth/AdminAuth-context";
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

export default function AdminLogIn() {
  const auth = useContext(AdminAuthContext);
  const classes = useStyles();
  const history = useHistory();
  const [adminId, setAdminId] = useState("");
  const [pass, setPass] = useState("");

  const handleAdmin = (e) => {
    setAdminId(e.target.value);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
  };

  const handleSubmit = (e) => {
    axios.get(`/auth/admin/login/${adminId}/${pass}`)
    .then(result=>{
      console.log(result)
    //   auth.Adminlogin(result.data.admin_id,result.data.adminToken);
    if(result.status === 201){
        history.push("/admin");
    }
    })
    .catch(err=>console.log(err));
    e.preventDefault();
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="College Id"
            label="Admin Id"
            name="Id"
            // autoComplete="email"
            autoFocus
            value={adminId}
            onChange={handleAdmin}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            // autoComplete="current-password"
            value={pass}
            onChange={handlePass}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}>
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
