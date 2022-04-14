import React from "react";
import "./index.css";
import App from "./App";
import Login from "./Login";
import SignUp from "./SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class AppRouter extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/">
                <App />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default AppRouter;
