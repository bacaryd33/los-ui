import React, { Component } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import Board from "./Board.js";
import { Link } from "react-router-dom";
import { SERVER_URL } from "./consts";
import Card from "./Card";
import "./App.css";
import "./card.css";
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
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

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
            champs:[],
            tableDeck:[],
            tabRequest:[],
            cards:[],
            isLoaded:false,
            error: ""
        };
        this.handleRandomMatchMaking=this.handleRandomMatchMaking.bind(this);
        this.handleJouer=this.handleJouer.bind(this);
        this.handleMatchRequest=this.handleRandomMatchMaking.bind(this);
        this.handleDeconnexion=this.handleDeconnexion.bind(this);
        this.handleUnsubscribe=this.handleUnsubscribe.bind(this);
    }

    //todo encrypter le password with bcrypt
    handleUnsubscribe(e){

        //et hashPass=bcrypt.hash(this.props.location.state.password,10);
        let hashPass=this.props.location.state.password;
        var saltRounds = 10; // cost factor
        //var hashPass = bcrypt.hashSync(this.props.location.state.password, saltRounds);
        let url=SERVER_URL+"/users/unsubscribe?email="+this.props.location.state.email+"&password="+hashPass+"&token="+this.props.location.state.token;
        axios.get(url).then(res=>{
           let data=res.data;
           if(data.status=="ok"){
           }
        });
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
        this.setState({Deck:this.state.tableDeck[cardPosition]});
    }

    handleJouer(e){

    }

    handleDeconnexion(e){
        let urlUnparticipate = SERVER_URL + "/matchmaking/unparticipate?matchmakingid=" + this.state.matchmakingid + "&token=" + this.props.location.state.token;
        axios.get(urlUnparticipate).then(res => {
            let data = res.data;
            if (data.status == "ok") {
                let url =
                    SERVER_URL +
                    "/users/disconnect";
                axios.get(url).then(res=>{
                    let data=res.data;
                    if(data.status=="ok") {
                        this.props.history.push(process.env.PUBLIC_URL + "/signin");
                    }else{
                            alert("failure disconnection");
                        }
                    });
            } else {
                alert("failure unparticipate");
            }
        });
    }

    randomPick(champs, number) {
        let rChamps = [];
        for (let i = 0; i < (number); i++) {
            let elem = champs.splice(Math.floor(Math.random() * champs.length), 1)[0];
            rChamps.push({"id": elem.key, "name": elem.name, "img": elem.key + "_0.jpg", flipped: true});
        }
        //console.log(rChamps);
        return rChamps;
    }
    generateCards(champs) {
        let cards = [];
        let str=["offensif","defensif","equilibré","hasard"];
        for (let i = 0; i < champs.length; i++) {
            cards.push(
                <Card id={champs[i][0].id}
                      name={str[i]}
                      img={champs[i][0].img}
                      key={i}
                      onClick={this.handleClick.bind(this, i)}
                />);
        }
        return cards;
    }

        render(){
            const error=this.state.error;
            const isLoaded=this.state.isLoaded;
            const tableD=this.state.tableDeck;
            if(error){
                return(<div className="Appli">
                        <nav className="navbar navbar-light">
                            <img src={logo}/>
                            <div>
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                </a>
                                <div className="dropdown-menu dropdown-menu-right"
                                     aria-labelledby="navbarDropdownMenuLink">
                                    <a className="dropdown-item" href="#">
                                        <button onClick={this.handleRule}><Link to="/signin"><img
                                            src={regle}/> Rules of the game</Link></button>
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        <button onClick={this.handleUnsubscribe}><Link to="/signin"><img
                                            src={desin}/> Delete my account</Link></button>
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        <button onClick={this.handleDeconnexion}><Link to="/signin"><img
                                            src={deco}/> Log out</Link></button>
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
                                            <p>Error</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3>Invite an opponent</h3>
                                        </div>
                                        <div className="card-body">
                                            <table id="tableMatchMaking" className="tableMatch">
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer>
                            <div className="footerMatchMaking">
                                <input type="checkbox" id="aleamatch" onChange={this.handleRandomMatchMaking}
                                       checked={this.state.randomMatch}/>
                                <label htmlFor="horns">Find a game randomly</label>
                            </div>
                            <button id="buttonPlay"
                                    className={this.state.readyToPlay ? "butMatchMakingSelected" : "butMatchMakingNotSelected"} onClick={this.handleJouer}>Play
                            </button>

                            <button type="button" id="try" className="btn btn-primary" data-toggle="modal"
                                    data-target="#popupMatch">
                                Try popupMatch
                            </button>
                        </footer>

                        <div className="modal fade" id="popupMatch" tabIndex="-1" role="dialog"
                             aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="headerpopup">
                                        <h5 className="modal-title" id="popupMatchlLabel" align="center">Match
                                            found</h5>

                                    </div>
                                    <div className="modal-body">
                                        <img src={blue}/><br/>
                                        <span id="nameOpponent">nameOpponent</span> wants to confront you
                                    </div>
                                    <div className="modal-footer">
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                            <button type="button" id="declineMatchmaking" className="btn btn-secondary"
                                                    data-dismiss="modal">Decline
                                            </button>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                            <button type="button" id="acceptMatchmaking"
                                                    className="btn btn-primary">Accept !
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            } else if (!isLoaded){
                return (<div className="Appli">
                        <nav className="navbar navbar-light">
                            <img src={logo}/>
                            <div>
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                </a>
                                <div className="dropdown-menu dropdown-menu-right"
                                     aria-labelledby="navbarDropdownMenuLink">
                                    <a className="dropdown-item" href="#">
                                        <button onClick={this.handleRule}><Link to="/signin"><img
                                            src={regle}/> Rules of the game</Link></button>
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        <button onClick={this.handleUnsubscribe}><Link to="/signin"><img
                                            src={desin}/> Delete my account</Link></button>
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        <button onClick={this.handleDeconnexion}><Link to="/signin"><img
                                            src={deco}/> Log out</Link></button>
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
                                            <p>Loading</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3>Invite an opponent</h3>
                                        </div>
                                        <div className="card-body">
                                            <table id="tableMatchMaking" className="tableMatch">
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer>
                            <div className="footerMatchMaking">
                                <input type="checkbox" id="aleamatch" onChange={this.handleRandomMatchMaking}
                                       checked={this.state.randomMatch}/>
                                <label htmlFor="horns">Find a game randomly</label>
                            </div>
                            <button id="buttonPlay"
                                    className={this.state.readyToPlay ? "butMatchMakingSelected" : "butMatchMakingNotSelected"} onClick={this.handleJouer}>Play
                            </button>

                            <button type="button" id="try" className="btn btn-primary" data-toggle="modal"
                                    data-target="#popupMatch">
                                Try popupMatch
                            </button>
                        </footer>

                        <div className="modal fade" id="popupMatch" tabIndex="-1" role="dialog"
                             aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="headerpopup">
                                        <h5 className="modal-title" id="popupMatchlLabel" align="center">Match
                                            found</h5>

                                    </div>
                                    <div className="modal-body">
                                        <img src={blue}/><br/>
                                        <span id="nameOpponent">nameOpponent</span> wants to confront you
                                    </div>
                                    <div className="modal-footer">
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                            <button type="button" id="declineMatchmaking" className="btn btn-secondary"
                                                    data-dismiss="modal">Decline
                                            </button>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                            <button type="button" id="acceptMatchmaking"
                                                    className="btn btn-primary">Accept !
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }else{
                let cards=this.generateCards(tableD);

                return(<div className="Appli">
                    <nav className="navbar navbar-light">
                        <img src={logo}/>
                        <div>
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            </a>
                            <div className="dropdown-menu dropdown-menu-right"
                                 aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="#">
                                    <button onClick={this.handleRule}><Link to="/signin"><img
                                        src={regle}/> Rules of the game</Link></button>
                                </a>
                                <a className="dropdown-item" href="#">
                                    <button onClick={this.handleUnsubscribe}><Link to="/signin"><img
                                        src={desin}/> Delete my account</Link></button>
                                </a>
                                <a className="dropdown-item" href="#">
                                    <button onClick={this.handleDeconnexion}><Link to="/signin"><img
                                        src={deco}/> Log out</Link></button>
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
                                        <section  className="row">
                                        {cards}
                                        </section>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h3>Invite an opponent</h3>
                                    </div>
                                    <div className="card-body">
                                        <table id="tableMatchMaking" className="tableMatch">
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer>
                        <div className="footerMatchMaking">
                            <input type="checkbox" id="aleamatch" onChange={this.handleRandomMatchMaking}
                                   checked={this.state.randomMatch}/>
                            <label htmlFor="horns">Find a game randomly</label>
                        </div>
                        <button id="buttonPlay"
                                className={this.state.readyToPlay ? "butMatchMakingSelected" : "butMatchMakingNotSelected"} onClick={this.handleJouer}>Play
                        </button>
                    </footer>
                </div>);
            }
  }

  componentDidMount() {
        function participateMatchMaking(){}
        function updateMatchMaking(){}
        function handleMatchRequest(tabRequest,tok,cont) {
          if(tabRequest.length>0){
              for(let elt of tabRequest){
                  if(window.confirm(elt.name+" vous defie  voulez vous jouez")){
                      let url=SERVER_URL+"/matchmaking/acceptRequest?matchmakingId="+elt.matchmakingId+"&token="+tok;
                      axios.get(url).then(res=>{
                          let data=res.data;
                          console.log(data);
                          if(data.status=="ok"){
                              alert("ici dans handle match request dans component did mout");
                              //this.props.history.push({state:{match:data}});
                              console.log("test dans handlematchrequest");
                              console.log(cont.state.tableDeck[cont.state.Deck]);
                              let deck=cont.state.tableDeck[cont.state.Deck];
                              for(let elt of deck){
                                  console.log(elt);
                                  deck.push({key:elt["name"]});
                              }
                              deck=JSON.stringify(deck);
                              let urlMatch=SERVER_URL+"/match/getMatch?token="+tok;
                              axios.get(urlMatch).then(res=>{
                                  let data=res.data;
                                  if(data.status=="ok"){
                                      console.log("get match succesfull");
                                      if (data.data.status="Deck is pending"){
                                          let urlChooseDeck=SERVER_URL+"/match/initDeck?deck="+deck+"&token="+tok;
                                          axios.get(urlChooseDeck).then(res=>{
                                              let data=res.data;
                                              if(data.status=="ok"){
                                                  alert("deck crée pour le joueur !");
                                                  cont.props.history.push(process.env.PUBLIC_URL + "/board");
                                              }
                                          });
                                      }
                                  }
                              });



                          }
                      })
                  }
              }
          }else{
          }
      }
        function SendRequest(data,tok,i){
          let url =
              SERVER_URL +
              "/matchmaking/request?matchmakingId="+data+"&token="
              +tok;
          axios.get(url).then(res=>{
              let data = res.data;
              if (data.status=="ok"){
                  this.props.history.push({state:{Deck:this.state.tableDeck[this.state.Deck]}});

              } else{
                  this.setState({ error: "Une erreur s'est produite : " + data.message });
              }
          })

      }
        function test(DeckAPasser,matchmakingId,isLoad,error,cont){
          //console.log(DeckAPasser);
          let url23=SERVER_URL+"/matchmaking/participate?&token="+tok;
          axios.get(url23).then((res, error)=>{
              let data=res.data;
              if(data.status=="ok"){
                  //console.log(DeckAPasser);
                  let allRequest=data.data["request"];
                  let match=data.data.match;
                  if(match!=null && isLoad==true){
                      console.log(DeckAPasser);
                      let deck=[];
                      for(let elt of DeckAPasser[0]){
                          console.log(elt);
                          deck.push({key:elt["name"]});
                      }
                      //console.log(deck);
                      alert("status ok dans matchRequest le joueur est dans un match avant la creation de son deck");
                      let urlMatch=SERVER_URL+"/match/getMatch?token="+tok;
                      axios.get(urlMatch).then(res=>{
                          let data=res.data;
                          if(data.status=="ok"){
                              console.log("get match succesfull");
                              if (data.data.status="Deck is pending"){
                                  deck=JSON.stringify(deck);
                                  let urlChooseDeck=SERVER_URL+"/match/initDeck?deck="+deck+"&token="+tok;
                                  axios.get(urlChooseDeck).then(res=>{
                                      let data=res.data;
                                      if(data.status=="ok"){
                                          alert("deck crée pour le joueur !");
                                          cont.props.history.push(process.env.PUBLIC_URL + "/board");
                                      }
                                  });
                              }
                          }
                      });


                  }else{
                      alert("param match a null");
                  }
                  handleMatchRequest(allRequest,tok,cont);
                  matchmakingId=data.data["matchmakingId"];
              }else{
                  error="une erreur s'est produite"+data.message;
              }
          });
      }
        function getCards(){
            let url2=SERVER_URL + "/cards/getAll";
        }
      const tok=this.props.location.state.token;
      let cont=this;
      if(this.state.isLoaded==false){
            getCards();
        }


      let DeckAPasser=[];
      let DeckChoisis=this.state.Deck;
      let url2=SERVER_URL +
          "/cards/getAll";
      axios.get(url2).then(res=>{
          let data=res.data;
          if(data.status==="ok") {
              let tableD=[];
              data = data.data;
              for(let i=0;i<4;i++){
                  let temporary=(this.randomPick(data,20));
                  if(i==DeckChoisis){
                    DeckAPasser.push(temporary);
                  }else{
                  }
                  tableD.push(temporary);
              }
              let champs=[];
              for(let i=0;i<tableD.length;i++){
                  for(let j=0;j<tableD[i].length;j++){
                      champs.push(tableD[i][j]);
                  }
              }
              let isLoad=true;
              let matchmakingId="";
              let Deck=2;
              let error=this.state.error;
              setTimeout(function (){
                test(DeckAPasser,matchmakingId,isLoad,error,this);
              },2000);
              setTimeout(function(count){
                  let url2 =
                      SERVER_URL +
                      "/matchmaking/getAll?&token="
                      +cont.props.location.state.token;
                  axios.get(url2).then(res => {
                      let datafgf;
                      datafgf = res.data;
                      if (datafgf.status === "ok") {
                          datafgf=datafgf.data;
                          let tableM=document.getElementById("tableMatchMaking");
                          var rowCount = tableM.rows.length;
                          for (var x=rowCount-1; x>0; x--) {
                              tableM.deleteRow(x);
                          }
                          //tableM.innerHTML="";
                          for( let i=0;i<datafgf.length;i++){
                              if(datafgf[i]["matchmakingId"]!=cont.state.matchmakingid){
                                  let  l1=tableM.insertRow(-1);
                                  let cellId=l1.insertCell(-1);
                                  let cellN=l1.insertCell(-1);
                                  let cellB=l1.insertCell(-1);
                                  let imgf=document.createElement("img");
                                  imgf.src=blue;
                                  cellId.appendChild(imgf);
                                  //cellId.innerHTML="<img src='./IconRed.png'/>";
                                  let matchMaking=datafgf[i]["matchmakingId"];
                                  cellN.innerHTML=datafgf[i]["name"];
                                  cellB.innerHTML="<button> Invite</button>"
                                  cellB.onclick=function(){
                                      SendRequest(matchMaking,cont.props.location.state.token,i);
                                  }
                              }else{
                              }
                          }
                      } else {
                          error="une erreur s est produite :"+datafgf.message;
                      }
                  });
              },800);
              this.setState({tableDeck:tableD,champs:champs,isLoaded:isLoad,matchmakingId:matchmakingId,error:error});
          }else{
              this.setState({error:"Une erreur s'est produite : "+data.message,isLoaded:true});
          }
      });
  }
    componentWillReceiveProps(nextProps) {
        function handleMatchRequest(tabRequest,tok) {
            if(tabRequest.length>0){
                for(let elt of tabRequest){
                    if(window.confirm(elt.name+" vous defie  voulez vous jouez")){
                        let url=SERVER_URL+"/matchmaking/acceptRequest/?matchmakingId="+elt.matchmakingId+"&token="+tok;
                        axios.get(url).then(res=>{
                            let data=res.data;
                            if(data.status=="ok"){
                                alert("ici dans handle match request");

                                this.props.history.push({pathname:process.env.PUBLIC_URL + "/board",
                                    state:{match:data}});
                            }
                        });
                    }
                }
            }else{
            }
        }
        function SendRequest(data,tok,i){
            let url =
                SERVER_URL +
                "/matchmaking/request?matchmakingId="+data+"&token="
                +tok;
            axios.get(url).then(res=>{
                let data = res.data;
                if (data.status=="ok"){
                    alert("request send");
                    this.props.history.push({state:{Deck:this.state.tableDeck[this.state.Deck]}});

                } else{
                    this.setState({ error: "Une erreur s'est produite : " + data.message });
                }
            })

        }
        let tok=this.props.location.state.token;
        let cont=this;
        setTimeout(function (cont){
            let url23=SERVER_URL+"/matchmaking/participate?&token="+tok;
            axios.get(url23).then(res=>{
                let data=res.data;
                if(data.status=="ok"){
                    let allRequest=data.request;
                    handleMatchRequest(allRequest,tok);
                    this.setState({matchmakingid:data.data["matchmakingId"]});
                    this.forceUpdate();
                }else{
                    this.setState({error: "Une erreur s'est produite : " + data.message});
                }
            })
        },2000);
        setTimeout(function(count){
            let url2 =
                SERVER_URL +
                "/matchmaking/getAll?&token="
                +cont.props.location.state.token;
            axios.get(url2).then(res => {
                let datafgf;
                datafgf = res.data;
                if (datafgf.status === "ok") {
                    let allRequest=datafgf.request;
                    datafgf=datafgf.data;
                    let tableM=document.getElementById("tableMatchMaking");
                    var rowCount = tableM.rows.length;
                    for (var x=rowCount-1; x>0; x--) {
                        tableM.deleteRow(x);
                    }
                    //tableM.innerHTML="";
                    for( let i=0;i<datafgf.length;i++){
                        if(datafgf[i]["matchmakingId"]!=cont.state.matchmakingid){
                            let  l1=tableM.insertRow(-1);
                            let cellId=l1.insertCell(-1);
                            let cellN=l1.insertCell(-1);
                            let cellB=l1.insertCell(-1);
                            let img=document.createElement("img");
                            img.source={blue};
                            cellId.appendChild(img);
                            let matchMaking=datafgf[i]["matchmakingId"];
                            cellN.innerHTML=datafgf[i]["name"];
                            let button=document.createElement("button");
                            button.onClick=SendRequest(matchMaking,cont.props.location.token,i);
                            cellB.appendChild(button);
                        }else{
                        }
                    }
                    this.forceUpdate();
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
        },800);
        let url2=SERVER_URL +
            "/cards/getAll";
        axios.get(url2).then(res=>{
            let data=res.data;
            if(data.status==="ok") {
                let tableD=[];
                data = data.data;
                for(let i=0;i<4;i++){
                    tableD[i]=this.randomPick(data,20);
                }
                let champs=[];
                for(let j=0;j<tableD.length;j++){
                    for(let u=0;u<tableD[j];u++){
                        champs.push(tableD[j][u]);
                    }
                }
                this.setState({tableDeck:tableD,champs:champs,isLoaded:true});
            }else{
                this.setState({error:"Une erreur s'est produite : "+data.message,isLoaded:true});
            }
        });
    }
}
export default Game;