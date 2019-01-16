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

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .get(
        SERVER_URL +
          "/users/connect?email=" +
          this.state.email +
          "&password=" +
          this.state.password
      )
      .then(res => {
        if (res.data.status === "ok") {
          this.props.setSessionToken(res.data.token);
          this.props.history.push(process.env.PUBLIC_URL + "/");
        }
      });
  }
  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
        <div class="container">
          <h1 class="form-heading">login Form</h1>
          <div class="login-form">
            <div class="main-div">
              <div class="panel">
                <h2>Connection</h2>
                <p>Please enter your email and password</p>
              </div>
              <form id="Login">
                <div class="form-group">
                  <input type="email" class="form-control" id="inputEmail" placeholder="Login" value={this.state.email}/>
                </div>
                <div class="form-group">
                  <input type="password" class="form-control" id="inputPassword" placeholder="Password" value={this.state.password}/>
                </div>
                <div class="forgot">
                  <p><Link to="/signup"> Creer un Compte des maintenant</Link></p>
                </div>
                <button type="submit" class="btn btn-primary">Login <Link to="/game"></Link></button>
              </form>
            </div>
          </div></div>
    );
  }
}

export default Signin;
