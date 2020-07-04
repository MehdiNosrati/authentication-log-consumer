import React, { useState, useCallback } from "react"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Box, Container, makeStyles, TextField, Button, FormControl, InputLabel, Input, InputAdornment, IconButton } from "@material-ui/core"
import produce from "immer"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useHistory } from "react-router";

const useStyles = makeStyles({
    verticalMargin: {
        marginTop: 8,
        marginBottom: 8,
        minWidth: 300,
        display: "flex",
        justifyContent: "center"
    },
    horizontalMargin: {
        marginRight: 8,
        marginLeft: 8
    }
});
type LoginInput = {
    username: string,
    password: string
}
export function Login() {
    const classes = useStyles()
    const history = useHistory()
    const [input, setInput] = useState<LoginInput>({
        username: "",
        password: ""
    })
    const [passwordVisible, setPasswordVisible] = useState(false)


    const login = useCallback(() => {
        fetch("http://localhost:8080/login", {
            method:"POST",
            mode: "cors",
            body: JSON.stringify(input)
        }).then(res => {
            if (res.headers.get("Authorization") !== null) {
                localStorage.setItem("token", res.headers.get("Authorization")!)
                history.push("/")
            }
        }).catch(err => {
            console.log(err);
        })
    }, [input, history])

    return <Container>
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            <TextField label="Username" value={input.username} className={classes.verticalMargin} onChange={(evt) => {
                setInput(produce(input, draft => {
                    draft.username = evt.target.value
                }))
            }}
            />
            <FormControl className={classes.verticalMargin}>
                <InputLabel htmlFor="adornment-password">Password</InputLabel>
                <Input
                    id="adornment-password"
                    type={passwordVisible ? 'text' : 'password'}
                    value={input.password}
                    onChange={(evt) => {
                        setInput(produce(input, draft => {
                            draft.password = evt.target.value
                        }))
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
                <Button className={classes.horizontalMargin}
                    color="primary"
                    variant="outlined"
                    onClick={() => history.push("/sign-up")}>
                    Sign Up
                </Button>
                <Button className={classes.horizontalMargin} 
                color="primary" 
                variant="contained" 
                onClick={login}
                endIcon={<ArrowForwardIosIcon />}>
                    Login
                </Button>

            </Box>
        </Box>
    </Container>
}