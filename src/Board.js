import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { SERVER_URL } from "./consts";

class Board extends Component{
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            email: "",
            password: "",
            confirmPassword: "",
            error: ""
        };
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
export default Board;