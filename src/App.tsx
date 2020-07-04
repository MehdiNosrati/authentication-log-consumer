import React, { useLayoutEffect } from 'react';
import { Route, Switch, Router } from "react-router"
import { createBrowserHistory } from 'history';
import { Logs } from './components/Logs';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';

function App() {
  const history = createBrowserHistory()
  useLayoutEffect(() => {
    if (!(localStorage.getItem("token") === null && history.location.pathname === "/")) {
      history.push("/")
    }
  }, [history])
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Logs} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
