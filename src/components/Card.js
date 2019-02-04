import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "../style/card.css";
class CardsDeck extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id={this.props.id} className="col-lg-3 col-md-4 col-xs-6 thumb flip" onClick={this.props.onClick} >
                <div className="card thumbnail " >
                    <div className="face front">
                        <img className="card-img"
                             src={"http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + this.props.img}/>
                        <div className="card-body">
                            <p className="card-text">{this.props.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default CardsDeck;