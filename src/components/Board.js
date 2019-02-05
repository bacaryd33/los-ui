import React, { Component } from "react";
import {Nav, NavItem} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.css";
import "../style/board.css";
import Card from "./Card.js";
import { SERVER_URL } from "../consts";
import "bootstrap/dist/js/bootstrap.js";
import axios from "axios";
import Game from "./Game";
import { Alert } from 'react-alert';
// import CardBoard from "CardBoard";
import Iblue from "./IconBlue.png";
import Ired from "./IconRed.png";
import heart from "./like.png";

class Board extends Component{

	constructor(props) {
		super(props);
		this.turn = true;
	}

	pickCard(deck,npick){
		if(this.turn && npick==0){
			let url=SERVER_URL + "match/pickCard"//+"?token="+this.state.player1.token
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
			let url=SERVER_URL + "match/playCard"//+"?card="+this.state.player1.hand.card.key+"&token="+this.state.player1.token
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
		if(this.turn){
			let url=SERVER_URL + "match/attack?card="//+this.player1.board.key+"&ennemyCard="+this.player2.board.key+"token="+this.props.location.token
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

	attackPlayer(card, ennemycard, hp){
		let attp = (SERVER_URL + "/match/attackPlayer?token=")

		//if (card = isBoard){

		}


	getMatch(){
		let getM = (SERVER_URL + "/match/getMatch?&token=")
		console.log(getM);
	}


	endturn() {
		console.log(this.props)
		let end = (SERVER_URL + "/match/endTurn?&token=" + this.props.location.state.token)
			.then(res => {
				let data = res.data;
				console.log(end);
			})
	}

	finishmatch(){
		// let finish = (SERVER_URL + "/match/finishMatch?&token=")
		// console.log(end);
		// if (player1.hp <= 0 && player2.hp <= 0)
		// axios.get(end + )
		// 	.then(res => {
		// 		let dd = res.dd


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
<<<<<<< HEAD:src/Board.js
						
					</div>
					<div className="oppname">
						<img src={heart} />
						<br/><p>150/150</p>
=======
					</div>
					<div className="oppname">
						Name Player 1
>>>>>>> 3904a61521330fcda2f4e68d01aa032f9013cc91:src/components/Board.js
					</div>
					<div className="oppavatar">
						<img src={Ired} /><br/>
						Opponent
					</div>
				</div>	
				
				<div className="midtop">
					<div className="oppplayedcard">
					<Card name="Jax" key="Jax" img="Jax"/>
					<Card name="Jax" key="Jax" img="Jax"/>
					<Card name="Jax" key="Jax" img="Jax"/>
					<Card name="Jax" key="Jax" img="Jax"/>
					<Card name="Jax" key="Jax" img="Jax"/>
					
					</div>
				</div>

				<div className="space">
					<div className="mydeck">
						DECK
					</div>
					
					<div className="myendturn">
						<button onClick={() => this.endturn()}> END TURN BOOOOOY </button>

					</div>
				</div>
				
				<div className="midbottom">
					<div className="myplayedcard">
					<Card name="Jax" key="Jax" img="Jax"/>
					<Card name="Jax" key="Jax" img="Jax"/>
					<Card name="Jax" key="Jax" img="Jax"/>
					<Card name="Jax" key="Jax" img="Jax"/>
					<Card name="Jax" key="Jax" img="Jax"/>
					</div>
					
				</div>
				
				<div className="bottom">
					<div className="myname">
<<<<<<< HEAD:src/Board.js
						<img src={heart} />
						<br/><p>150/150</p>
					</div>
					<div className="myhand">
					<Card name="Jax" key="Jax" img="Jax"/>
					<Card name="Jax" key="Jax" img="Jax"/>
					<Card name="Jax" key="Jax" img="Jax"/>
					<Card name="Jax" key="Jax" img="Jax"/>
					
					</div>
					<div className="myavatar">
						<img src={Iblue} /><br/>
						MyName
=======
						Name Player 2
					</div>
					<div className="myavatar">
>>>>>>> 3904a61521330fcda2f4e68d01aa032f9013cc91:src/components/Board.js
					</div>
				</div>
				
			</div>
		)}
}

export default Board;