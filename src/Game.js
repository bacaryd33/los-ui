import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SERVER_URL } from "./consts";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            randomMatch:false,
            findMatch:false,
            Deck:0,
            readyToPlay:false,
            error: ""
        };
        this.handleRandomMatchMaking=this.handleRandomMatchMaking.bind(this);
        this.handleJouer=this.handleJouer.bind(this);
    }
    handleRandomMatchMaking(e){
        e.preventDefault();
        if (this.state.randomMatch){
            this.setState({randomMatch:false});
        }else{
            this.setState({randomMatch:true,findMatch:false});
        }
        if(this.state.randomMatch){
            if (this.state.Deck==0){
                this.setState({ readyToPlay: true });
            }
        }
        if(!this.state.randomMatch){
            this.setState({readyToPlay:false});
        }
    }

    handleJouer(e){

    }
  render() {
    return (
      <div className="App">
          <div className="colequal">
              <h1> Choissez votre Deck </h1>
              <table></table>
          </div>
          <div className="colequal">
              <h1>MatchMaking</h1>
              <table id="tableMatchMaking"></table>
          </div>
          <footer>
              <div className="footerMatchMaking">
                  <input type="checkbox" id="aleamatch"  onChange={this.handleRandomMatchMaking} checked={this.state.randomMatch}/>
                      <label htmlFor="horns">Lancer un match aleatoire</label>
              </div>
              <button id="buttonPlay" className={this.state.readyToPlay ? "butMatchMakingSelected" : "butMatchMakingNotSelected"}>Jouer</button>

          </footer>
      </div>
    );
  }
  componentDidMount() {
        console.log(this.props);
      let url =
          SERVER_URL +
          "/matchmaking/getAll?&token="
        +this.props.location.state.token;
      axios.get(url).then(res => {
          let data = res.data;
          if (data.status === "ok") {
              let tableM=document.getElementById("tableMatchMaking");
              //to do
              //this.props.history.push(process.env.PUBLIC_URL + "/");
          } else {
              this.setState({ error: "Une erreur s'est produite : " + data.message });
          }
      });
  }
}
export default Game;