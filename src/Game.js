import React, { Component } from "react";
import { Link } from "react-router-dom";

import { SERVER_URL } from "./consts";
import logo from "./logo.svg";
import "./App.css";

class Game extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>League of Stones</h2>
          <p>Bienvenue</p>
            <button><Link to="/board">jouer</Link></button>
        </header>
      </div>
    );
  }
}

export default Game;
