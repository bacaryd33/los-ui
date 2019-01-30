import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SERVER_URL } from "./consts";
import Card from "./Card";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

class Makedeck extends Component {
    constructor(props){
        super(props)
        // let Selected = this.fetchcard()
        // this.addC = this.addC.bind(this)
        this.state = {
            Selected: Selected,
            Unselected: []
        };
    }
    componentDidMount() {
        fetch(``)
            .then(res => res.json())
            .then(json => this.setState({ data: json }));
    }
    async fetchcard() {
        let d = await axios.get(SERVER_URL + '/card/getAll')

    }

    render() {
        return(
            <div>
                <ul>
                    {this.state.Unselected.map(el => (
                        <li>
                            {el.name}: {el.title} - {el.image.full}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}