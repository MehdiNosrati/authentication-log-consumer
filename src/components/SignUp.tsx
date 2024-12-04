import React, { useState, useCallback } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { makeStyles } from "tss-react/mui";
import {
  Box,
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { produce } from "immer";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useHistory } from "react-router";

const useStyles = makeStyles()((_) => ({
  verticalMargin: {
    marginTop: 8,
    marginBottom: 8,
    minWidth: 300,
    display: "flex",
    justifyContent: "center",
  },
  horizontalMargin: {
    marginRight: 8,
    marginLeft: 8,
  },
}));
type SignUpInput = {
  username: string;
  password: string;
  name: string;
};
export function SignUp() {
  const { classes } = useStyles();
  const history = useHistory();
  const [input, setInput] = useState<SignUpInput>({
    username: "",
    password: "",
    name: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const signUp = useCallback(() => {
    fetch("http://localhost:8080/users/sign-up", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((_res) => {
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [input, history]);

  return (
    <Container>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <TextField
          label="Name"
          value={input.name}
          className={classes.verticalMargin}
          onChange={(evt) => {
            setInput(
              produce(input, (draft) => {
                draft.name = evt.target.value;
              })
            );
          }}
        />
        <TextField
          label="Username"
          value={input.username}
          className={classes.verticalMargin}
          onChange={(evt) => {
            setInput(
              produce(input, (draft) => {
                draft.username = evt.target.value;
              })
            );
          }}
        />
        <FormControl className={classes.verticalMargin}>
          <InputLabel htmlFor="adornment-password">Password</InputLabel>
          <Input
            id="adornment-password"
            type={passwordVisible ? "text" : "password"}
            value={input.password}
            onChange={(evt) => {
              setInput(
                produce(input, (draft) => {
                  draft.password = evt.target.value;
                })
              );
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  onMouseDown={(evt) => evt.preventDefault()}
                >
                  {passwordVisible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Box className={classes.verticalMargin}>
          <Button
            className={classes.horizontalMargin}
            color="primary"
            variant="outlined"
            onClick={() => history.push("/login")}
          >
            Login
          </Button>
          <Button
            className={classes.horizontalMargin}
            color="primary"
            variant="contained"
            onClick={signUp}
            endIcon={<ArrowForwardIosIcon />}
          >
            Sing Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
