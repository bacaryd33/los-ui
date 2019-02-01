import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Column, Row } from 'simple-flexbox';
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
                <Column flexGrow={1}>
                    <Row horizontal='center'>
                        <h1>HAND</h1>
                    </Row>
                    <Row vertical='center'>
                        <Column flexGrow={1} horizontal='center'>
                            <h3> CARD 1 </h3>
                            <span> column 1 content </span>
                        </Column>
                        <Column flexGrow={1} horizontal='center'>
                            <h3> CARD 2 </h3>
                            <span> column 2 content </span>
                        </Column>
                        <Column flexGrow={1} horizontal='center'>
                            <h3> CARD 3 </h3>
                            <span> column 2 content </span>
                        </Column>
                        <Column flexGrow={1} horizontal='center'>
                            <h3> CARD 4 </h3>
                            <span> column 2 content </span>
                        </Column>
                        <Column flexGrow={1} horizontal='center'>
                            <h3> CARD 5 </h3>
                            <span> column 2 content </span>
                        </Column>
                        <Column flexGrow={1} horizontal='center'>
                            <h3> CARD 6 </h3>
                            <span> column 2 content </span>
                        </Column>
                        <Column flexGrow={1} horizontal='center'>
                            <h3> CARD 7 </h3>
                        </Column>
                    </Row>
                </Column>

            </div>
        );
    }
}
export default Board;