import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { USER_REGISTER_MUTATION } from "../Api/user";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import EmailIcon from "@material-ui/icons/Email";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";

const useStyles = makeStyles(() => ({
  formsContainer: {
    justifyContent: "center",
  },
  field: {
    marginTop: 20,
  },
  submitButton: {
    marginTop: 25,
  },
}));

const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const [register, { data: registerData }] = useMutation(
    USER_REGISTER_MUTATION
  );

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [usernameMessageError, setUsernameMessageError] = useState("");
  const [emailMessageError, setEmailMessageError] = useState("");
  const [passwordMessageError, setPasswordMessageError] = useState("");
  const [
    passwordConfirmMessageError,
    setPasswordConfirmMessageError,
  ] = useState("");

  const setErrorMessage = (message, field) => {
    console.log(field);
    if (field === "username") {
      setUsernameMessageError(message);
    }
    if (field === "email") {
      setEmailMessageError(message);
    }
    if (field === "password1") {
      setPasswordMessageError(message);
    }
    if (field === "password2") {
      setPasswordConfirmMessageError(message);
    }
  };

  const resetErrorMessages = () => {
    setUsernameMessageError("");
    setEmailMessageError("");
    setPasswordConfirmMessageError("");
    setPasswordConfirmMessageError("");
  };

  useEffect(() => {
    if (registerData) {
      const {
        register: { errors, user },
      } = registerData;
      const registerWasNotSuccessful = user === null;

      resetErrorMessages();

      if (registerWasNotSuccessful) {
        errors.forEach(({ messages, field }) => {
          const [message] = messages;
          setErrorMessage(message, field);
        });
      } else {
        history.push("/login");
      }
    }
  }, [registerData, history]);

  const handleOnRegister = async () => {
    await register({
      variables: {
        username,
        email,
        password1: password,
        password2: passwordConfirm,
      },
    });
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.formsContainer} container>
        <Grid item xs={11} sm={8} md={5} lg={3}>
          <TextField
            onChange={(e) => setUsername(e.target.value)}
            className={classes.usernameField}
            error={usernameMessageError !== "" ? true : false}
            helperText={usernameMessageError !== "" ? usernameMessageError : ""}
            id="username-input"
            label="Username"
            autoComplete="off"
            fullWidth
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            className={classes.field}
            error={emailMessageError !== "" ? true : false}
            helperText={emailMessageError !== "" ? emailMessageError : ""}
            id="email-input"
            label="Email"
            autoComplete="off"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            className={classes.field}
            error={passwordMessageError !== "" ? true : false}
            helperText={passwordMessageError !== "" ? passwordMessageError : ""}
            id="password-input"
            label="Password"
            autoComplete="one-time-code"
            fullWidth
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className={classes.field}
            error={passwordConfirmMessageError !== "" ? true : false}
            helperText={
              passwordConfirmMessageError !== ""
                ? passwordConfirmMessageError
                : ""
            }
            id="confirm-password-input"
            label="Confirm Password"
            autoComplete="one-time-code"
            fullWidth
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            onClick={handleOnRegister}
            className={classes.submitButton}
            variant="contained"
            size="large"
            color="primary"
            fullWidth
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
