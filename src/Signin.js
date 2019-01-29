import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from './mainLogo.png';

import { SERVER_URL } from "./consts";
import 'bootstrap/dist/css/bootstrap.css';

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
        <div class="container">
          <div class="login-form">
             <img src={logo}/>
            <div class="main-div">
              <div class="card">
                <div class="card-header">
                  <h2>Connection</h2>
                </div>
                <div class="card-body">
                  <form id="Login">
                    <div class="form-group">
                      <label for="inputEmail">Email address</label>
                      <input type="email" class="form-control" id="inputEmail" value={this.state.email} onChange={this.handleChangeEmail}/>
                    </div>
                    <div class="form-group">
                      <label for="inputPassword">Password</label>
                      <input type="password" class="form-control" id="inputPassword" value={this.state.password} onChange={this.handleChangePassword}/>
                    </div>
                    <button type="submit" class="btn btn-primary" id="connexion" onClick={this.handleSubmit}>Login</button>
                    <div class="forgot">
                      <p><Link to="/signup"> Creer un Compte dès maintenant</Link></p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div></div>
    );
  }
}

export default Signin;
