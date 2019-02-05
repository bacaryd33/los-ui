// import React, {Component} from "react";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap.js";
// import "./card.css";
//
//
// class Card extends Component {
//     attack;
//     defense;
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         let flipped = "notflipped";
//         if(this.props.flipped){
//             flipped = "flipped";
//         }
//         return (
//             /*<div id={this.props.id} className="col-lg-3 col-md-4 col-xs-6 thumb flip" onClick={this.props.onClick} >
//                 <div className={"card thumbnail " + flipped} >
//                     <div className="face front">
//                         <img className="card-img-top"
//                              src={"http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + this.props.img+"_0.jpg"}
//                              alt="Card  cap"/>
//                         <div className="card-body">
//                             <p className="card-text">{this.props.name}</p>
//                         </div>
//                     </div>
//                     <div className="face back">
//                         <img className="card-img-top" src="Card-Back.png" alt="Card  cap"/>
//                     </div>
//                 </div>
//             </div>*/
//             <div className="cardzone">
//                 <img className="imgcard"
//                      src={"http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + this.props.img+"_0.jpg"}
//                 />
//                 <div className="namecard">
//                     {this.props.name}
//                 </div>
//                 <div className="skillcard">
//                     <div className="atqcard">
//                         {this.attack}
//                     </div>
//                     <div className="defcard">
//                         {this.defense}
//                     </div>
//                 </div>
//             </div>
//
//         );
//     }
// }
//
// export default Card;

import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./card.css";
import { Button } from "bootstrap/dist/js/bootstrap.js";
class Card extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const isFlipped = this.props.flipped
        let DisplaySrc = ''
        let DisplayNameCard = ''
        let DisplaySkillCard = ""

        if (isFlipped) {
            DisplaySrc = <img className="imgcard" src={"http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + this.props.img+"_0.jpg"}/>
            DisplayNameCard = <p className="card-text">{this.props.name}</p>
            DisplaySkillCard = <div className="skillcard"><div className="atqcard">atk</div><div className="defcard">def</div></div>
        }
        else {
            DisplaySrc = <img className="imgcard" src={"http://ddragon.leagueoflegends.com/cdn/9.2.1/img/champion/Amumu.png"}/>
        }
        console.log(this.props.DisplaySrc);
        

        return (
            <div id={this.props.id} className="cardzone" onClick={this.props.onClick} >
                {DisplaySrc}
                <div className="namecard">
                        {DisplayNameCard}
                    </div>
                {DisplaySkillCard}
            </div>

            
        );
    }
}
export default Card;

/**
 * <div id={this.props.id} className="col-lg-3 col-md-4 col-xs-6 thumb flip" onClick={this.props.onClick} >
                <div className="card thumbnail " >
                    <div className="face front">
                        <img className="card-img"
                             src={"http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + this.props.img+"_0.jpg"}
                             alt="Card  cap"/>
                        <div className="card-body">
                            <p className="card-text">{this.props.name}</p>
                        </div>
                    </div>
                </div>
            </div>
 */