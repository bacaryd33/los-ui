import React, { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Signin from "./Signin";
import Signup from "./Signup";
import Game from "./Game";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ""
    };
  }

  setSessionToken(token) {
    this.setState({ token });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/signin"
            component={Signin}
            setSessionToken={this.setSessionToken}
          />
          <Route path="/signup" component={Signup} />
          <Route component={Game} token={this.state.token} />
        </Switch>
      </Router>
    );
  }
}

export default App;
