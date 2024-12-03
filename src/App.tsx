import React, { useLayoutEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Logs } from "./components/Logs";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";

function App() {
  const history = useHistory();
  useLayoutEffect(() => {
    if (
      !(
        localStorage.getItem("token") === null &&
        history.location.pathname === "/"
      )
    ) {
      history.push("/");
    }
  }, [history]);
  return (
    <Switch>
      <Route exact path="/" component={Logs} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/sign-up" component={SignUp} />
    </Switch>
  );
}

export default App;
