import React, { Component } from "react";
import {Nav, NavItem} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.css";
import "./board.css";
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
            <div className="board">
                <p> dans le match making</p>
            </div>
        );
    }
}
export default Board;