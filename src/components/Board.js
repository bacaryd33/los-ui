import React, { Component } from "react";
import {Nav, NavItem} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.css";
import "../style/board.css";
import Card from "./Card.js";
import { SERVER_URL } from "../consts";
import Mediacard from "./CardBoard"
import "bootstrap/dist/js/bootstrap.js";
import axios from "axios";



class Board extends Component {

	constructor(props) {
		super(props);
		this.getMatch()
		this.state = {
			status: null, //Deck is pending /
			player1: true,
			player2: false
		}
	};


	pickCard(deck,npick){
		if(this.turn && npick==0){
			let url=SERVER_URL + "match/pickCard"
			axios.get(url).then(res=>{
				let data = res.data;
				if (data.status=="ok"){
					alert("Card Picked");
				} else{
					this.setState({ error: "Error of Card Picking : " + data.message });
				}
			})
		}

	}


	playcard(hand,turn,card){
		if(turn){
			let url=SERVER_URL + "match/playCard"
			axios.get(url).then(res=>{
				let data = res.data;
				if (data.status=="ok"){
					alert("Card played");
				} else{
					this.setState({ error: "Error Playing Card : " + data.message });
				}
			})
		}
	}

	attack(card,ennemycard){

	}

	attackPlayer(card, ennemycard, hp){
		let attp = (SERVER_URL + "/match/attackPlayer?token=")

		//if (card = isBoard){

		}


	getMatch(){
		let getM = (SERVER_URL + "/match/getMatch?&token=")
		console.log(getM);
	}


	async endturn() {
		let end = (SERVER_URL + "/match/endTurn?&token=")
		console.log(end);
		await axios.get(end + this.props.location.state.token)
			.then(res => {
				let data = res.data;
				console.log(data);
			})
	}

	finishmatch(){
		let end = (SERVER_URL + "/match/finishMatch?&token=");
		console.log(end);
		axios.get(end)
			.then(res => {
				let data = res.data;
				console.log(data);
			})
	}


	componentDidMount() {
		// const tok = this.props.location.token;
		// console.log(tok);
		let url = (SERVER_URL + "/cards/getAll");
		console.log(url)
		axios.get(url)
			.then(res => {
				let data = res.data;
				console.log(data);
			});

	}
	componentWillReceiveProps(){
		// let ulr2=(SERVER_URL+)
	}

	render()
	{
		return(
			<div className="board">
				<div className="top">
					<div className="opphand">
						HAND
					</div>
					<div className="oppname">
						NAME
					</div>
					<div className="oppavatar">
						AVATAR
					</div>
				</div>
				<div className="midtop">
					<div className="oppplayedcard">
						<Card key={"XinZhao"} name={"XinZhao"} img="XinZhao" />
						<Card key={"XinZhao"} name={"XinZhao"} img="XinZhao" />
						<Card key={"XinZhao"} name={"XinZhao"} img="XinZhao" />
						<Card key={"XinZhao"} name={"XinZhao"} img="XinZhao" />
						<Card key={"XinZhao"} name={"XinZhao"} img="XinZhao" flipped={true}/>
					</div>
				</div>
				<div className="space">
				</div>
				<div className="midbottom">
					<div className="mydeck">
						DECK
					</div>
					<div className="myendturn">
						<button onClick={this.endturn}> END TURN BOOOOOY </button>

					</div>
					<div className="myplayedcard">
						<Card/>
					</div>
				</div>
				<div className="bottom">
					<div className="myhand">
						HAND
					</div>
					<div className="myname">
						NAME
					</div>
					<div className="myavatar">

					</div>
				</div>
			</div>
		)}
}

export default Board;