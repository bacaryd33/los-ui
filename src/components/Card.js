import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "../style/card.css";
class Card extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id={this.props.id} className="cardzone" onClick={this.props.onClick} >
                <img className="imgcard"
                     src={"http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + this.props.img+ "_0.jpg"}
                />
                <div className="namecard">
                    <p className="card-text">{this.props.name}</p>
                </div>
                <div className="skillcard">
                    <div className="atqcard">
                        Atq
                    </div>
                    <div className="defcard">
                        Def
                    </div>
                </div>
            </div>


        );
    }
}
export default Card;