import React, { Component } from "react";
import {Nav, NavItem} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.css";
import "./board.css";
import Card from "./Card.js";
import { SERVER_URL } from "./consts";
import Mediacard from "./CardBoard"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import Grid from 'react-css-grid'
//ajouter navbar
//automatiser resize board
//placer zone carte (deck, hand, board)
//facultatif placer hand adverse
//récupérer json depuis web service
import "bootstrap/dist/js/bootstrap.js";
import axios from "axios";
import Makedeck from "./Makedeck";
import Game from "./Game";
// import CardBoard from "CardBoard";


class Board extends Component{

	constructor(props) {
		super(props);
		this.turn=true;
		console.log(props)
		this.state = {
			showHand: false
		};
		this.showHand = this.showHand.bind(this);
		this.closeHand = this.closeHand.bind(this);
	}

	showHand(event) {
		event.preventDefault();

		this.setState({ showHand: true }, () => {
				document.addEventListener('onMouseEnter', this.closeHand);
			});
	}

	closeHand() {
		this.setState({ showHand: false }, () => {
			document.removeEventListener('onMouseEnter', this.closeHand);
		});
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

	endturn(turn){

	}

	finishmatch(){

	}

	componentDidMount(){//douille get token par action extérieure
		let url=(SERVER_URL+"/cards/getAll");
			console.log(url)     
		axios.get(url)
			.then(res=>{
				let data=res.data;
				console.log(data);});
	}

	componentWillReceiveProps(){

	}

	render()
	{
		return(
			<div className="board">
				<div className="top">
					<div className="opphand">
						Opp HAND
					</div>
					<div className="oppname">
						main adverse
					</div>
					<div className="oppavatar"> 
					</div>
				</div>
				<div className="midtop">
					<div className="oppplayedcard">
						<Card key={"XinZhao"} name={"XinZhao"} img="XinZhao" flipped={true}/>
						<Card key={"XinZhao"} name={"XinZhao"} img="XinZhao" flipped={true}/>
						<Card key={"XinZhao"} name={"XinZhao"} img="XinZhao" flipped={true}/>
						<Card key={"XinZhao"} name={"XinZhao"} img="XinZhao" flipped={true}/>
						<Card key={"XinZhao"} name={"XinZhao"} img="XinZhao" flipped={true}/>
					</div>
				</div>
				<div className="space">
					<div type="button" class="btn btn-primary" className="mydeck">
						DECK
					</div>
					<div className="myendturn">
						END TURN
					</div>
				</div>
				<div className="midbottom" onMouseEnter={this.closeHand}>
					<div className="myplayedcard">
						<Card key={"XinZhao"} name={"XinZhao"} img="XinZhao" flipped={true}/>
						<Card key={"XinZhao"} name={"XinZhao"} img="XinZhao" flipped={true}/>
						<Card key={"XinZhao"} name={"XinZhao"} img="XinZhao" flipped={true}/>
						<Card key={"XinZhao"} name={"XinZhao"} img="XinZhao" flipped={true}/>
						<Card key={"XinZhao"} name={"XinZhao"} img="XinZhao" flipped={true}/>
					</div>
				</div>
				<div className="bottom" onMouseEnter={this.showHand}>
				{
					this.state.showHand
					? (
					<div
					className="myhand"
					ref={(element) => {
						this.dropdownHand = element;
					}}
					>
						<Card className="handcard" key={"XinZhao"} name={"XinZhao"} img="Aatrox" flipped={true}/>
						<Card className="handcard" key={"XinZhao"} name={"XinZhao"} img="Jax" flipped={true}/>
						<Card className="handcard" key={"XinZhao"} name={"XinZhao"} img="XinZhao" flipped={true}/>
						<Card className="handcard" key={"XinZhao"} name={"XinZhao"} img="XinZhao" flipped={true}/>
					</div>	
						)
					: (
						null
					)
				}
					
					<div className="myname">
						main
					</div>
					<div className="myavatar">
						AVATAR
					</div>
				</div>
			</div>
		)}
}

export default Board;