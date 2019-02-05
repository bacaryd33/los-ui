import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

//var bcrypt=require("bcrypt");

import { SERVER_URL } from "../consts";
import logo from '../images/mainLogo.png';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: ""
    };
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(
      this
    );
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChangeLogin(e) {
    this.setState({ login: e.target.value });
  }
  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }
  handleChangeConfirmPassword(e) {
    this.setState({ confirmPassword: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      this.setState({ error: "Les deux mots de passe ne correspondent pas" });
      return;
    }
    alert("l utilisateur "+email+" a bien été inscrit");
   // let salt=bcrypt.genSaltSync(10);
    //let hashPass=bcrypt.hashSync(this.props.location.state.password,salt);
    let url =
      SERVER_URL +
      "/users/subscribe?email=" +
      email +
      "&password=" +
      //hashPass +
      "&name=" +
      this.state.login;
    axios.get(url).then(res => {
      let data = res.data;
      if (data.status === "ok") {
        this.props.history.push(process.env.PUBLIC_URL + "/signin");
      } else {
        this.setState({ error: "Une erreur s'est produite : " + data.message });
      }
    });
  }
  render() {
    return (
        <div className="container">
          <div className="login-form">
            <img src={logo}/>
            <div className="main-div">
              <div className="card">
                <div className="card-header">
                  <h2>Inscription</h2>
                </div>
                <div className="card-body">
                  <form id="Login">
                    <div className="form-group">
                      <label for="inputLogin">Login</label>
                      <input type="text" className="form-control" id="inputLogin"
                             value={this.state.login} onChange={this.handleChangeLogin}/>
                    </div>
                    <div className="form-group">
                      <label for="inputEmail">Email address</label>
                      <input type="email" className="form-control" id="inputEmail"
                             value={this.state.email} onChange={this.handleChangeEmail}/>
                    </div>
                    <div className="form-group">
                      <label for="inputPassword">Password</label>
                      <input type="password" className="form-control" id="inputPassword"
                             value={this.state.password} onChange={this.handleChangePassword}/>
                    </div>
                    <div className="form-group">
                      <label for="inputRePassword">Confirm Password</label>
                      <input type="password" className="form-control" id="inputRePassword"
                             value={this.state.confirmPassword} onChange={this.handleChangeConfirmPassword}/>
                    </div>
                    <button type="submit" className="btn btn-primary" id="connexion" onClick={this.handleSubmit}>Inscription</button>
                    <div className="forgot">
                      <p><Link to="/signin"> Vous avez deja un compte ? Connectez vous !</Link></p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Signup;
