import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { SERVER_URL } from "./consts";

import "./App.css";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  setConnection() {
    axios
      .get(
        SERVER_URL +
          "/users/connect?email=" +
          this.state.email +
          "&password=" +
          this.state.password
      )
      .then(res => {
        const data = res.data;
        if (data.status === "ok") {
          /*  this.props.dispatch({ type: 'CONNECT' });
        this.props.dispatch({ type: 'SETUSER', value: data.data.name});
        this.props.dispatch({ type: 'SETTOKEN', value: data.data.token});
        this.props.dispatch({ type: 'SETEMAIL', value: this.state.email});*/
          this.props.setSessionToken(data.data.token);
        }
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          Connectez-vous :
          <div>
            <label>
              Login : <input type="text" value={this.state.email} />
            </label>
          </div>
          <div>
            <label>
              Mot de passe : <input type="text" value={this.state.password} />
            </label>
          </div>
          <div>
            <input type="submit" value="Se connecter" />
          </div>
        </form>
        <div>
          {
            "Vous n’avez pas de compte ? Créez votre compte en quelques secondes "
          }
          <Link to="/signup">en cliquant ici !</Link>
        </div>
      </div>
    );
  }
}

export default Signin;
