import React, { useEffect, useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";

// styles
import useStyles from "./styles";

// logo
import logo from "../../assets/logo.jpeg";
import google from "../../images/google.svg";

// context
import { login } from "../../Actions/adminActions";

const Login = ({ history, location }) => {
  var classes = useStyles();
  const dispatch = useDispatch();

  // global
  // var userDispatch = useUserDispatch();

  // local
  var [isLoading] = useState(false);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [mobileNumber, setMobileNumber] = useState("");
  var [password, setPasswordValue] = useState("");

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo, error } = adminLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    console.log("first");
    if (adminInfo) {
      window.location.reload();
    }
  }, [history, adminInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(mobileNumber, password));
  };

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>
          Agrawwaal Telecomm Services,Pune
        </Typography>
      </div>
      <div className={classes.formContainer}>
        <div
          className={classes.form}
          style={{
            marginBottom: "12%",
          }}
        >
          <div className={classes.greeting}>
            <Typography className={classes.titleText}>Motor Diary</Typography>
          </div>
        </div>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label=" Existing User" classes={{ root: classes.tab }} />
            <Tab
              label="New User"
              style={{
                cursor: "pointer",
              }}
              // classes={{ root: classes.tab }}
              disabled
            />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <form onSubmit={submitHandler}>
                <Typography variant="h4" className={classes.greeting}>
                  Login
                </Typography>
                {/* <Button size="large" className={classes.googleButton}>
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div> */}
                <Fade in={error}>
                  <Typography
                    color="secondary"
                    className={classes.errorMessage}
                  >
                    Something is wrong with your login or password :(
                  </Typography>
                </Fade>
                <TextField
                  id="email"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  margin="normal"
                  placeholder="Mobile Number"
                  type="number"
                  fullWidth
                />
                <TextField
                  id="password"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={password}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  margin="normal"
                  placeholder="Password"
                  type="password"
                  fullWidth
                />
                <div className={classes.formButtons}>
                  {isLoading ? (
                    <CircularProgress
                      size={26}
                      className={classes.loginLoader}
                    />
                  ) : (
                    <Button
                      disabled={
                        mobileNumber.length === 0 || password.length === 0
                      }
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Login
                    </Button>
                  )}
                  {/* <Button
                    color="primary"
                    size="large"
                    className={classes.forgetButton}
                  >
                    Forget Password
                  </Button> */}
                </div>
              </form>
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Welcome!
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Create your account
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                margin="normal"
                placeholder="Full Name"
                type="text"
                fullWidth
              />
              <TextField
                id="mobile"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                margin="normal"
                placeholder="Mobile Number"
                type="number"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={password}
                onChange={(e) => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() => login(mobileNumber, password)}
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Create your account
                  </Button>
                )}
              </div>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div>
              <Button
                size="large"
                className={classnames(
                  classes.googleButton,
                  classes.googleButtonCreating
                )}
              >
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button>
            </React.Fragment>
          )}
        </div>
        <Typography color="primary" className={classes.copyright}>
          <a
            style={{ textDecoration: "none", color: "inherit" }}
            href="mailto:kopssolutions@gmail.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            {" "}
            © {new Date().getFullYear()} Work Bench , Solutions. All rights are
            reserved.
          </a>
        </Typography>
      </div>
    </Grid>
  );
};

export default withRouter(Login);
