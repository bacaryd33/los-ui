import React, { Component } from "react";
import {Nav, NavItem} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.css";
import "./board.css";
import { Link } from "react-router-dom";

class Board extends Component{
    constructor(props) {
        super(props);
        this.state = {
            hp: "",
            mana: "",


        }

    }
    
    render() {
        return (
                <div class="board">
                </div>
           );
      }
}
export default Board;