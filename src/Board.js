import React, { Component } from "react";
import {Nav, NavItem,Button} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.css";
import "./board.css";
import Card from "./Card.js";
import { SERVER_URL } from "./consts";

//ajouter navbar
//automatiser resize board
//placer zone carte (deck, hand, board)
//facultatif placer hand adverse
//récupérer json depuis web service

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import axios from "axios";

class Board extends Component {


	constructor(props) {
		super(props);
		this.state = {
			status:null, //Deck is pending / 
			player1:null,
			player2:null,
		};
	}
//localhost:3001/match/initDeck?[{key:"Jax"},{key:"Sona"},{key:"Tristana"},{key:"TahmKench"},{key:"Singed"},{key:"Thresh"},{key:"Karma"}]
	initDeck(tabdeck,token,i){ //a tester
		let url =
		SERVER_URL +
			"/match/initDeck?deck="+tabdeck+"&token="+token;
		axios.get(url).then(res=>{
			let data = res.data;
			if (data.status=="ok"){
				alert("Deck initialized");
			} else{
				this.setState({ error: "Error Deck initialization : " + data.message });
			}
		})
	}

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

	endturn(turn){

	}

	finishmatch(){

	}

	componentDidMount(){
		let url=(SERVER_URL+"/cards/getAll");
		axios.get(url)
		.then(res=>{
			let data=res.data;
			console.log(data);});
		//console.log(url)
	}

	componentWillReceiveProps(){

	}

	render() {     
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

				<div className="oppdeck">
					DECK
				</div>

				<div className="oppendturn">
					END TURN
				</div>

				<div className="oppplayedcard">
					<Card key={"XinZhao"} name={"XinZhao"} img="XinZhao" />
					<Card key={"XinZhao"} name={"XinZhao"} img="XinZhao" />
					<Card key={"XinZhao"} name={"XinZhao"} img="XinZhao" />
					<Card key={"XinZhao"} name={"XinZhao"} img="XinZhao" />
					<Card key={"XinZhao"} name={"XinZhao"} img="XinZhao" flipped={true}/>
				</div>

			</div>

			<div className="midbottom">

				<Button className="mydeck" variant="success">
					Deck
				</Button>

				<Button className="myendturn" variant="success">
					end turn
				</Button>
				

				<div className="myplayedcard">
					<Card key={"XinZhao"} name={"XinZhao"} img="XinZhao" />
					<Card key={"XinZhao"} name={"XinZhao"} img="XinZhao" />
					<Card key={"XinZhao"} name={"XinZhao"} img="XinZhao" />	
				</div>

			</div>

			<div className="bottom">

				<div className="myhand">
					HAND
				</div>

				<div className="myname">
					monNomninou
				</div>

				<div className="myavatar">
					
				</div>

			</div>
			
		</div>
       
        )}
}

export default Board;
