import React, { Component } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import Board from "./Board.js";

import logo from "./logo.svg";
import "./App.css";

class Game extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>League of Stones</h2>
          <a href="/match">Fake match</a>
        </header>
        <Router>
          <Switch>
            <Route path="/match" Component={Board}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Game;
