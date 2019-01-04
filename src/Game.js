import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false
    };
  }

  setConnection() {}

  render() {
    if (this.state.isConnected) {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>League of Stones</h2>
            <p>Bienvenue</p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      );
    }
    return <Redirect to="/signin" />;
  }
}

export default App;
