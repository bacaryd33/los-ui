

import React, { Component } from "react";

class Player extends Component{
    constructor(props) {
		super(props);
		this.state = {
            hp:25,
            hand:[],
            board:[],
            deck:[],
            cardPicked:null,
            turn:true
		};

	}
}