import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SERVER_URL } from "./consts";
import Card from "./Card";
import logo from './miniLogo.png';
import deco from './deconnexion.png';
import desin from './desinscrire.png';
import regle from './regles.png';
import card from './mainLogo.png';
import blue from './IconBlue.png';
import green from './IconGreen.png';
import purple from './IconPurple.png';
import yellow from './IconYellow.png';
import red from './IconRed.png';
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
            matchmakingid:"",
            tableDeck:[],
            error: ""
        };
        this.handleRandomMatchMaking=this.handleRandomMatchMaking.bind(this);
        this.handleJouer=this.handleJouer.bind(this);
        this.handleMatchRequest=this.handleRandomMatchMaking.bind(this);
        this.handleDeconnexion=this.handleDeconnexion.bind(this);
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
    handleClick(cardPosition, event) {
        this.setState({Deck:cardPosition});
    }
    handleJouer(e){

    }
    handleDeconnexion(e){
        let urlUnparticipate=SERVER_URL+"/matchmaking/unparticipate?matchmakingid="+this.state.matchmakingid+"&token="+this.props.location.state.token;
        axios.get(urlUnparticipate).then(res=>{
            let data=res.data;
            if(data.status=="ok"){
                alert("ok");
            }else{
                alert("failure unparticipate");
            }
        });
        let url =
            SERVER_URL +
            "/users/disonnect?&token="+this.props.location.state.token;
        axios.get(url).then(res=>{
            let data=res.data;
            if(data.status==="ok"){
                alert("disconnect user");
            }else{
                alert("epic failed");
            }
        });
    }
    handleMatchRequest(e){
        alert("marche po");
    }
    randomPick(champs, number) {
        let rChamps = [];
        for (let i = 0; i < (number / 2); i++) {
            let elem = champs.splice(Math.floor(Math.random() * champs.length), 1)[0];
            rChamps.push({"id": elem.key, "name": elem.name, "img": elem.key + "_0.jpg", flipped: true});
            rChamps.push({"id": elem.key, "name": elem.name, "img": elem.key + "_1.jpg", flipped: true});
        }
        return rChamps;
    }

        render() {
    return (
      <div className="Appli">
      <nav class="navbar navbar-light">
        <img src={logo}/>
        <div>
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
            <a class="dropdown-item" href="#">
              <button onClick={this.handleDeconnexion}><Link to="/signin"><img src={regle}/> Rules of the game</Link></button>
            </a>
            <a class="dropdown-item" href="#">
              <button onClick={this.handleDeconnexion}><Link to="/signin"><img src={desin}/> Delete my account</Link></button>
            </a>
            <a class="dropdown-item" href="#">
              <button onClick={this.handleDeconnexion}><Link to="/signin"><img src={deco}/> Log out</Link></button>
            </a>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div className="card">
              <div className="card-header">
                <h3> Chose your Deck </h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div className="card">
                      <img src={card} className="card-img-top" alt="Deck1"/>
                      <div className="card-body">
                        <input class="form-check-input" type="radio" name="choosedeck" id="deck1" value="option1" checked/>
                        <label class="form-check-label" for="deck1">
                          Choose the deck 1
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div className="card">
                    <img src={card} className="card-img-top" alt="Deck2"/>
                    <div className="card-body">
                      <input class="form-check-input" type="radio" name="choosedeck" id="deck2" value="option2"/>
                      <label class="form-check-label" for="deck2">
                        Choose the deck 2
                      </label>
                    </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div className="card">
                    <img src={card} className="card-img-top" alt="Deck3"/>
                    <div className="card-body">
                      <input class="form-check-input" type="radio" name="choosedeck" id="deck3" value="option3"/>
                      <label class="form-check-label" for="deck3">
                        Choose the deck 3
                      </label>
                    </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div className="card">
                    <img src={card} className="card-img-top" alt="Deck4"/>
                    <div className="card-body">
                      <input class="form-check-input" type="radio" name="choosedeck" id="deck4" value="option4"/>
                      <label class="form-check-label" for="deck4">
                        Choose the deck 4
                      </label>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div className="card">
              <div className="card-header">
                <h3>Invite an opponent</h3>
              </div>
              <div className="card-body">
                <div className="row opponent">
                  <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                    <img src={blue} />
                  </div>
                  <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    nameOpponent
                  </div>
                  <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <button id="buttonInvite" className={this.state.readyToPlay ? "butMatchMakingSelected" : "butMatchMakingNotSelected"}>Invite</button>
                  </div>
                  <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                    <img src={green} />
                  </div>
                  <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    nameOpponent
                  </div>
                  <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <button id="buttonInvite" className={this.state.readyToPlay ? "butMatchMakingSelected" : "butMatchMakingNotSelected"}>Invite</button>
                  </div>
                  <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                    <img src={yellow} />
                  </div>
                  <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    nameOpponent
                  </div>
                  <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <button id="buttonInvite" className={this.state.readyToPlay ? "butMatchMakingSelected" : "butMatchMakingNotSelected"}>Invite</button>
                  </div>
                  <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                    <img src={purple} />
                  </div>
                  <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    nameOpponent
                  </div>
                  <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <button id="buttonInvite" className={this.state.readyToPlay ? "butMatchMakingSelected" : "butMatchMakingNotSelected"}>Invite</button>
                  </div>
                  <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                    <img src={red} />
                  </div>
                  <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    nameOpponent
                  </div>
                  <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <button id="buttonInvite" className={this.state.readyToPlay ? "butMatchMakingSelected" : "butMatchMakingNotSelected"}>Invite</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
          <footer>
              <div className="footerMatchMaking">
                  <input type="checkbox" id="aleamatch"  onChange={this.handleRandomMatchMaking} checked={this.state.randomMatch}/>
                  <label htmlFor="horns">Find a game randomly</label>
              </div>
              <button id="buttonPlay" className={this.state.readyToPlay ? "butMatchMakingSelected" : "butMatchMakingNotSelected"}>Play</button>

          </footer>
      </div>
    );
  }
  componentDidMount() {
        function SendRequest(data,tok,i){
            let url =
                SERVER_URL +
                "/matchmaking/request?matchmakingid="+data+"&token="
                +tok;
            axios.get(url).then(res=>{
                let data = res.data;
                if (data.status=="ok"){
                    alert("request send");
                } else{
                    this.setState({ error: "Une erreur s'est produite : " + data.message });
                }
            })

        }
        let url2=SERVER_URL+"/matchmaking/participate?&token="+this.props.location.state.token;
        axios.get(url2).then(res=>{
            let data=res.data;
            if(data.status=="ok"){
                this.setState({matchmakingid:data.data["matchmakingId"]});
            }else{
                this.setState({error: "Une erreur s'est produite : " + data.message});
            }
        })
        let tok=this.props.location.state.token;
      let url =
          SERVER_URL +
          "/matchmaking/getAll?&token="
        +this.props.location.state.token;
      axios.get(url).then(res => {
          var datafgf;
          datafgf = res.data;
          if (datafgf.status === "ok") {
              datafgf=datafgf.data;
              console.log(datafgf);
              let tableM=document.getElementById("tableMatchMaking");
              for( var i=0;i<datafgf.length;i++){
                  if(datafgf[i]["matchmakingId"]!=this.state.matchmakingid){
                     let  l1=tableM.insertRow(-1);
                     let cellId=l1.insertCell(-1);
                     let cellN=l1.insertCell(-1);
                     let matchMaking=datafgf[i]["matchmakingId"];
                     cellId.innerHTML=datafgf[i]["matchmakingId"];
                     cellN.innerHTML=datafgf[i]["name"];
                     l1.onclick=function(){
                        SendRequest(matchMaking,tok,i);
                     }
                     }else{
                      alert("passe par la");
                  }
                  }
                   //   l1.insertData(elt.id);
                     // l1.insertData(elt.name);
                     // l1.onclick=function(){alert("test new");};
                    // tableM.innerHTML+="<tr><th onclick='function(){alert(1);'>elt.id</th><th>elt.name</th></tr>";
                  //}
              //} /*
              //this.props.history.push(process.env.PUBLIC_URL + "/");
          } else {
              this.setState({ error: "Une erreur s'est produite : " + datafgf.message });
          }
      });
      let tabDeck={};
      url=SERVER_URL +
          "/cards/getAll?&token="
          +this.props.location.state.token;
      axios.get(url).then(res=>{
          let data=res.data;
          //console.log(data);
          if(data.status==="ok") {
              let tableD=[];
              data = data.json();
              for(let i=0;i<4;i++){
                  tableD[i]=this.randomPick(data,12);
              }
              let tableJ=JSON.parse(tableD.json());
              for(let j=0;j<tableD.length;j++){
                  tableD[j]=tableD[j]["key"];
              }
              this.setState({tableDeck:tableD});
              let table=document.getElementById("tableDeck");
              let l1=table.insertRow(-1);
              let deck1=l1.insertCell(-1);
              deck1.innerHTML=<Card id={tableJ[0].id}

                              name={tableJ[0].name}

                              img={tableJ[0].img}

                              flipped={tableJ[0].flipped}

                              key={tableJ[0].key}

                              onClick={this.handleClick.bind(this,0)}

              />;
              let deck2=l1.insertCell(-1);
               deck2.innerHTML=<Card id={tableJ[1].id}

                                        name={tableJ[1].name}

                                        img={tableJ[1].img}

                                        flipped={tableJ[1].flipped}

                                        key={tableJ[1].key}

                                        onClick={this.handleClick.bind(this,1)}

              />;
              let l2=table.insertRow(-1);
              let deck3=l1.insertCell(-1);
              deck3.innerHTML=<Card id={tableJ[2].id}

                                        name={tableJ[2].name}

                                        img={tableJ[2].img}

                                        flipped={tableJ[2].flipped}

                                        key={tableJ[2].key}

                                        onClick={this.handleClick.bind(this,2)}

              />;
              let deck4=l2.insertCell(-1);
              deck4.innerHTML=<Card id={tableJ[3].id}

                                        name={tableJ[3].name}

                                        img={tableJ[3].img}

                                        flipped={tableJ[3].flipped}

                                        key={tableJ[3].key}

                                        onClick={this.handleClick.bind(this,3)}

              />;

          }else{
              this.setState({error:"Une erreur s'est produite : "+data.message});
          }
      })
  }
}
export default Game;
