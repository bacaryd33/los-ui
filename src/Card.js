import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./card.css";

class Card extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let flipped = "notflipped";
		if(this.props.flipped){
			flipped = "flipped";
		}
		return (
			/*<div id={this.props.id} className="col-lg-3 col-md-4 col-xs-6 thumb flip" onClick={this.props.onClick} >
				<div className={"card thumbnail " + flipped} >
					<div className="face front">
						<img className="card-img-top"
							 src={"http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + this.props.img+"_0.jpg"}
							 alt="Card  cap"/>
						<div className="card-body">
							<p className="card-text">{this.props.name}</p>
						</div>
					</div>
					<div className="face back">
						<img className="card-img-top" src="Card-Back.png" alt="Card  cap"/>
					</div>
				</div>
			</div>*/
			<div className="cardzone">
				<img className="imgcard"
					src={"http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + this.props.img+"_0.jpg"}
				/>
				<div className="namecard">
					{this.props.name}
				</div>
				<div className="skillcard">
					<div className="atqcard">
						8
					</div>
					<div className="defcard">
						10
					</div>
				</div>
			</div>

		);
	}
}

export default Card;