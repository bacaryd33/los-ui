import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { SERVER_URL } from "./consts";

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
    let url =
      SERVER_URL +
      "/users/subscribe?email=" +
      email +
      "&password=" +
      password +
      "&name=" +
      this.state.login;
    axios.get(url).then(res => {
      let data = res.data;
      if (data.status === "ok") {
        this.props.history.push(process.env.PUBLIC_URL + "/");
      } else {
        this.setState({ error: "Une erreur s'est produite : " + data.message });
      }
    });
  }
  render() {
    return (
        <div className="container">
          <h1 className="form-heading">SignUp Form</h1>
          <div className="login-form">
            <div className="main-div">
              <div className="panel">
                <h2>Inscription</h2>
                <p>Completez les champs</p>
              </div>
              <form id="Login">
                <div className="form-group">
                  <input type="text" className="form-control" id="inputEmail" placeholder="Login"
                         value={this.state.login} onChange={this.handleChangeLogin}/>
                </div>
                <div className="form-group">
                  <input type="email" className="form-control" id="inputEmail" placeholder="random@gmail.com"
                         value={this.state.email} onChange={this.handleChangeEmail}/>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" id="inputPassword" placeholder="Password"
                         value={this.state.password} onChange={this.handleChangePassword}/>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" id="inputPassword" placeholder="PasswordConfirm"
                         value={this.state.confirmPassword} onChange={this.handleChangeConfirmPassword}/>
                </div>
                <div className="forgot">
                  <p><Link to="/signin"> Vous avez deja un compte ? Connectez vous !</Link></p>
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Login</button>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

export default Signup;
