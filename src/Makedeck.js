import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SERVER_URL } from "./consts";
import Card from "./Card";
import axios from "axios";
import MediaCard from "./CardBoard";

const champions = require('./champion.json')


class Makedeck extends Component {
    constructor(props){
        super(props)
        let Unselected = champions
        this.state = {
            Unselected: Unselected,
            Selected: []
        }
    }

    // componentDidMount() {
    //     fetch(``)
    //         .then(res => res.json())
    //         .then(json => this.setState({ data: json }));
    // }
    // async fetchcard() {
    //     let d = await axios.get(SERVER_URL + '/card/getAll')
    //
    // }

    render() {
        console.log(champions)
        return(
            <div>
                {this.state.Unselected.map(el => (
                        <Card>
                            {el.name}: {el.attack} - {el.defense}
                        </Card>
                    ))}
                </div>
        )
    }

    map(param) {
        
    }
}

export default Makedeck;