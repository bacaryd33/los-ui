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
      token:"",
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
          this.props.setSessionToken(res.data["data"]["token"]);
          this.setState({token:res.data["data"]["token"]});
          this.props.history.push({pathname:process.env.PUBLIC_URL + "/",
          state:{token: this.state.token}});
        }else{
          alert("Login ou password faux");
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
        <div className="container">
          <h1 className="form-heading">Login Form</h1>
          <div className="login-form">
            <div className="main-div">
              <div className="panel">
                <h2>Connection</h2>
                <p>Please enter your email and password</p>
              </div>
              <form id="Login">
                <div className="form-group">
                  <label>E-mail</label>
                  <input type="email" className="form-control" id="inputEmail" placeholder="Login" value={this.state.email} onChange={this.handleChangeEmail}/>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" id="inputPassword" placeholder="Password" value={this.state.password} onChange={this.handleChangePassword}/>
                </div>
                <div className="forgot">
                  <p><Link to="/signup"> Creer un Compte des maintenant</Link></p>
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Login</button>
              </form>
            </div>
          </div></div>
    );
  }
}

export default Signin;