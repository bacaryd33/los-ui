import React, { Component } from "react";
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
} from "react-router-dom";
import Board from "./Board.js";
import { SERVER_URL } from "../consts";
import CardsDeck from "./Card";
import "../App.css";
import "../style/card.css";
import logo from '../images/miniLogo.png';
import deco from '../images/deconnexion.png';
import desin from '../images/desinscrire.png';
import regle from '../images/regles.png';
import card from '../images/mainLogo.png';
import blue from '../images/IconBlue.png';
import green from '../images/IconGreen.png';
import purple from '../images/IconPurple.png';
import yellow from '../images/IconYellow.png';
import red from '../images/IconRed.png';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            Deck:0,
            matchmakingId:"",
            champs:[],
            tableDeck:[],
            tabAdversaire:[],
            isLoaded:false,
            error: ""

        };
        this.handleJouer=this.handleJouer.bind(this);
        this.handleDeconnexion=this.handleDeconnexion.bind(this);
        this.handleUnsubscribe=this.handleUnsubscribe.bind(this);
        this.handleRule=this.handleRule.bind(this);

    }

    //todo encrypter le password with bcrypt
    handleUnsubscribe(e){
        console.log("handle unsubscribe");
        //let hashPass=bcrypt.hash(this.props.location.state.password,10);
        let hashPass=this.props.location.state.password;
        let url=SERVER_URL+"/users/unsubscribe?email="+this.props.location.state.email+"&password="+hashPass+"&token="+this.props.location.state.token;
        axios.get(url).then(res=>{
            let data=res.data;
            if(data.status=="ok"){
                this.props.history.push(process.env.PUBLIC_URL + "/signup");
            }
        });
    }
    /*handleRandomMatchMaking(e){
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
    }*/

    handleRule(){
        alert("handle rules");

    }

    handleClick(cardPosition, event) {
        //console.log("handle click");
        this.setState({Deck:cardPosition});
    }
    sendRequest(matchmaking){
        console.log("SendRequest this");
        let url =
            SERVER_URL +
            "/matchmaking/request?matchmakingId="+matchmaking+"&token="
            +this.props.location.state.token;
        axios.get(url).then(res=>{
            let data = res.data;
            if (data.status=="ok"){
                alert("request send");
                this.props.history.push({state:{Deck:this.state.tableDeck[this.state.Deck]}});

            } else{
                this.setState({ error: "Une erreur s'est produite : " + data.message });
            }
        });
    }
    handleJouer(e){
        console.log("handle jouer");
        if(this.state.isLoaded && this.state.tabAdversaire.length>0){
            for(let elt of this.state.tabAdversaire){
                this.sendRequest(elt['matchmakingId']);
            }
        }
    }

    handleDeconnexion(e){
        console.log("handle Deco");
        let urlUnparticipate = SERVER_URL + "/matchmaking/unparticipate?matchmakingid=" + this.state.matchmakingid + "&token=" + this.props.location.state.token;
        axios.get(urlUnparticipate).then(res => {
            let data = res.data;
            if (data.status == "ok") {
                let url = SERVER_URL + "/users/disconnect";
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
        //console.log("random Pick");
        let rChamps = [];
        for (let i = 0; i < (number); i++) {
            let elem = champs.splice(Math.floor(Math.random() * champs.length), 1)[0];
            rChamps.push({"id": elem.key, "name": elem.name, "img": elem.key + "_0.jpg", flipped: true});
        }
        //console.log(rChamps);
        return rChamps;
    }
    generateCards(champs) {
        //console.log("generate Cards");
        let cards = [];
        let str=["Offensif","Defensif","Equilibré","Hasard"];
        for (let i = 0; i < champs.length; i++) {
            cards.push(
                <CardsDeck id={champs[i][0].id}
                           name={str[i]}
                           img={champs[i][0].img}
                           key={i}
                           onClick={this.handleClick.bind(this, i)}
                />);
        }
        return cards;
    }

    render(){
        //console.log("render");
        const error=this.state.error;
        const isLoaded=this.state.isLoaded;
        const tableD=this.state.tableDeck;
        if(error){
            console.log("render error");
            return(
                <div className="Appli">
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
                        <button id="buttonPlay"
                                className="butMatchMakingSelected" onClick={this.handleJouer}>Play against random
                        </button>
                    </footer>
                </div>
            );
        } else if (!isLoaded){
            console.log("render not loaded");
            return (
                <div className="Appli">
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
                        <button id="buttonPlay"
                                className="butMatchMakingSelected" onClick={this.handleJouer}>Play
                        </button>
                    </footer>
                </div>
            );
        }else{
            let cards=this.generateCards(tableD);
            console.log("render loaded");
            return(
                <div className="Appli">
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
                        <button id="buttonPlay"
                                className="butMatchMakingSelected" onClick={this.handleJouer}>Play
                        </button>
                    </footer>
                </div>
            );
        }
    }

    componentDidMount() {
        //console.log("componentDedMount");
        function getMatch(){
            console.log("getMatchComponentDidMount");
            let urlMatch=SERVER_URL+"/match/getMatch?token="+tok;
            axios.get(urlMatch).then(res=>{
                let data=res.data;
                if(data.status=="ok"){
                    console.log("get match succesfull");
                    if (data.data.status="Deck is pending"){
                        let deck=cont.state.tableDeck[cont.state.Deck];
                        initDeckForMatch(deck);
                    }
                }else{
                    cont.setState({error:"Une erreur s'est produite : "+data.message});
                }
            });
        }
        function initDeckForMatch(deck){
            console.log("init Deck componentDidMount");
            let deckJson=[];
            for(let elt of deck){
                deckJson.push({key:elt['name']});
            }
            deckJson=JSON.stringify(deckJson);
            let urlChooseDeck=SERVER_URL+"/match/initDeck?deck="+deck+"&token="+tok;
            axios.get(urlChooseDeck).then(res=>{
                let data=res.data;
                if(data.status=="ok"){
                    alert("deck crée pour le joueur !");
                    changeLocToPlateau(cont);
                }else{
                    cont.setState({error:"Une erreur s'est produite : "+data.message});
                }
            });
        }
        function changeLocToPlateau(){
            console.log("change loc plateau componentDidMount");
            cont.props.history.push(process.env.PUBLIC_URL + "/board");
        }
        function participateMatchMaking(matchmakingId){
            console.log("participateMatchMaking didMount");
            let urlParticipate=SERVER_URL+"/matchmaking/participate?&token="+tok;
            axios.get(urlParticipate).then(res=>{
                let data=res.data;
                if(data.status=="ok"){
                    data=data.data;
                    matchmakingId=data['matchmakingId'];
                    let allRequest=data['request'];
                    let match=data['match'];
                    if(match!=undefined && cont.state.isLoaded){
                        getMatch();
                    }else{
                        handleMatchRequest(allRequest,tok,cont)
                    }
                }else{
                    cont.setState({error:"Une erreur s'est produite : "+data.message});
                }
            });
        }
        function updateMatchMaking(tabAdversaire){
            console.log("updateMatchMaking did mount");
            let urlUpdateMatchMaking = SERVER_URL + "/matchmaking/getAll?&token=" +cont.props.location.state.token;
            axios.get(urlUpdateMatchMaking).then(res => {
                let data;
                data = res.data;
                if (data.status === "ok") {
                    data=data.data;
                    let tableM=document.getElementById("tableMatchMaking");
                    var rowCount = tableM.rows.length;
                    for (var x=rowCount-1; x>0; x--) {
                        tableM.deleteRow(x);
                    }
                    for( let i=0;i<data.length;i++){
                        if(data[i]["matchmakingId"]!=cont.state.matchmakingid){
                            let  l1=tableM.insertRow(-1);
                            let cellImg=l1.insertCell(-1);
                            let cellN=l1.insertCell(-1);
                            let cellB=l1.insertCell(-1);
                            let img=document.createElement("img");
                            img.src=blue;
                            cellImg.appendChild(img);
                            let matchMaking=data[i]["matchmakingId"];
                            cellN.innerHTML=data[i]["name"];
                            cellB.innerHTML="<button> Invite</button>"
                            cellB.onclick=function(){
                                SendRequest(matchMaking,cont.props.location.state.token,i);
                            }
                        }
                    }
                    tabAdversaire=data;
                } else {
                    cont.setState({error:"Une erreur s'est produite : "+data.message});
                }
            });
        }
        function handleMatchRequest(tabRequest,tok,cont) {
            console.log("handle match Request component did mount");
            if(tabRequest.length>0){
                for(let elt of tabRequest){
                    if(window.confirm(elt.name+" vous defie  voulez vous jouez")){
                        let url=SERVER_URL+"/matchmaking/acceptRequest?matchmakingId="+elt.matchmakingId+"&token="+tok;
                        axios.get(url).then(res=>{
                            let data=res.data;
                            if(data.status=="ok"){
                                getMatch();
                            }else{
                                cont.setState({error:"Une erreur s'est produite : "+data.message});
                            }
                        });
                    }
                }
            }
        }
        function SendRequest(data,tok,i){
            console.log("send Request component did mount");
            let url =
                SERVER_URL +
                "/matchmaking/request?matchmakingId="+data+"&token="
                +tok;
            axios.get(url).then(res=>{
                let data = res.data;
                if (data.status=="ok"){
                    alert("request send");
                    cont.props.history.push({state:{Deck:this.state.tableDeck[this.state.Deck]}});

                } else{
                    cont.setState({ error: "Une erreur s'est produite : " + data.message });
                }
            });
        }
        // function test(DeckAPasser,matchmakingId,isLoad,error,cont){
        //     console.log("test component did mount");
        //     //console.log(DeckAPasser);
        //     let url23=SERVER_URL+"/matchmaking/participate?&token="+tok;
        //     axios.get(url23).then((res, error)=>{
        //         let data=res.data;
        //         if(data.status=="ok"){
        //             //console.log(DeckAPasser);
        //             let allRequest=data.data["request"];
        //             let match=data.data.match;
        //             if(match!=null && isLoad==true){
        //                 console.log(DeckAPasser);
        //                 let deck=[];
        //                 for(let elt of DeckAPasser[0]){
        //                     console.log(elt);
        //                     deck.push({key:elt["name"]});
        //                 }
        //                 //console.log(deck);
        //                 alert("status ok dans matchRequest le joueur est dans un match avant la creation de son deck");
        //                 let urlMatch=SERVER_URL+"/match/getMatch?token="+tok;
        //                 axios.get(urlMatch).then(res=>{
        //                     let data=res.data;
        //                     if(data.status=="ok"){
        //                         console.log("get match succesfull");
        //                         if (data.data.status="Deck is pending"){
        //                             deck=JSON.stringify(deck);
        //                             let urlChooseDeck=SERVER_URL+"/match/initDeck?deck="+deck+"&token="+tok;
        //                             axios.get(urlChooseDeck).then(res=>{
        //                                 let data=res.data;
        //                                 if(data.status=="ok"){
        //                                     alert("deck crée pour le joueur !");
        //                                     cont.props.history.push(process.env.PUBLIC_URL + "/board");
        //                                 }
        //                             });
        //                         }
        //                     }
        //                 });
        //
        //
        //             }else{
        //                 alert("param match a null");
        //             }
        //             handleMatchRequest(allRequest,tok,cont);
        //             matchmakingId=data.data["matchmakingId"];
        //         }else{
        //             error="une erreur s'est produite"+data.message;
        //         }
        //     });
        // }
        function getCards(){
            console.log("get Cards component did mount");
            let url2=SERVER_URL + "/cards/getAll";
            axios.get(url2).then(res=>{
                let data=res.data;
                if(data.status==="ok") {
                    let tableD=[];
                    data = data.data;
                    for(let i=0;i<4;i++){
                        let temporary=(cont.randomPick(data,20));
                        tableD.push(temporary);
                    }
                    let champs=[];
                    //a quoi ca sert ?? a revoir
                    for(let i=0;i<tableD.length;i++){
                        for(let j=0;j<tableD[i].length;j++){
                            champs.push(tableD[i][j]);
                        }
                    }
                    let isLoad=true;
                    cont.setState({tableDeck:tableD,champs:champs,isLoaded:true});
                    let final = tableD;
                }else{
                    cont.setState({error:"Une erreur s'est produite : "+data.message,isLoaded:true});
                }
            });
        }
        const tok=this.props.location.state.token;
        let cont=this;
        let matchMaking="";
        let tabAdversaire=[];

        if(cont.state.isLoaded==false){
            getCards();
        }else{
            //console.log("set Timeout componentDidMount");
            participateMatchMaking(matchMaking);
            updateMatchMaking(tabAdversaire);
            cont.setState({matchmakingId:matchMaking,tabAdversaire:tabAdversaire});
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        //console.log("component did update");
        function getMatch(){
            //console.log("getMatch");
            let urlMatch=SERVER_URL+"/match/getMatch?token="+tok;
            axios.get(urlMatch).then(res=>{
                let data=res.data;
                if(data.status=="ok"){
                    console.log("get match succesfull");
                    if (data.data.status="Deck is pending"){
                        let deck=cont.state.tableDeck[cont.state.Deck];
                        initDeckForMatch(deck);
                    }
                }else{
                    cont.setState({error:"Une erreur s'est produite : "+data.message});
                }
            });
        }
        function initDeckForMatch(deck){
            //console.log(deck);
            //console.log("init Deck");
            let deckJson=[];
            for(let elt of deck){
                //console.log(elt);
                deckJson.push({key:elt['name']});
            }
            deckJson=JSON.stringify(deckJson);
            let urlChooseDeck=SERVER_URL+"/match/initDeck?deck="+deckJson+"&token="+tok;
            axios.get(urlChooseDeck).then(res=>{
                let data=res.data;
                if(data.status=="ok"){
                    alert("deck crée pour le joueur !");
                    changeLocToPlateau(cont);
                }else{
                    cont.setState({error:"Une erreur s'est produite : "+data.message});
                }
            });
        }
        function changeLocToPlateau(){
            console.log("change loc plateau");

            cont.props.history.push(process.env.PUBLIC_URL + "/board");

        }
        function participateMatchMaking(matchmakingId){
            console.log("participateMatchMaking componentdidupdate");
            let urlParticipate=SERVER_URL+"/matchmaking/participate?&token="+tok;
            axios.get(urlParticipate).then(res=>{
                let data=res.data;
                if(data.status=="ok"){
                    data=data.data;
                    matchmakingId=data['matchmakingId'];
                    let allRequest=data['request'];
                    let match=data['match'];
                    if(match!=undefined && cont.state.isLoaded){
                        getMatch();
                    }else{
                        handleMatchRequest(allRequest,tok,cont)
                    }
                }else{
                    cont.setState({error:"Une erreur s'est produite : "+data.message});
                }
            });
        }
        function updateMatchMaking(tabAdversaire){
            console.log("updateMatchMaking");
            let urlUpdateMatchMaking = SERVER_URL + "/matchmaking/getAll?&token=" +cont.props.location.state.token;
            axios.get(urlUpdateMatchMaking).then(res => {
                let data;
                data = res.data;
                if (data.status === "ok") {
                    data=data.data;
                    let tableM=document.getElementById("tableMatchMaking");
                    var rowCount = tableM.rows.length;
                    for (var x=rowCount-1; x>0; x--) {
                        tableM.deleteRow(x);
                    }
                    for( let i=0;i<data.length;i++){
                        if(data[i]["matchmakingId"]!=cont.state.matchmakingid){
                            let  l1=tableM.insertRow(-1);
                            let cellImg=l1.insertCell(-1);
                            let cellN=l1.insertCell(-1);
                            let cellB=l1.insertCell(-1);
                            let img=document.createElement("img");
                            img.src=blue;
                            cellImg.appendChild(img);
                            let matchMaking=data[i]["matchmakingId"];
                            cellN.innerHTML=data[i]["name"];
                            cellB.innerHTML="<button> Invite</button>"
                            cellB.onclick=function(){
                                SendRequest(matchMaking,cont.props.location.state.token,i);
                            }
                        }
                    }
                    tabAdversaire=data;
                } else {
                    cont.setState({error:"Une erreur s'est produite : "+data.message});
                }
            });
        }
        function handleMatchRequest(tabRequest,tok,cont) {
            console.log("handle match Request");
            if(tabRequest.length>0){
                for(let elt of tabRequest){
                    if(window.confirm(elt.name+" vous defie  voulez vous jouez")){
                        let url=SERVER_URL+"/matchmaking/acceptRequest?matchmakingId="+elt.matchmakingId+"&token="+tok;
                        axios.get(url).then(res=>{
                            let data=res.data;
                            if(data.status=="ok"){
                                getMatch();
                            }else{
                                cont.setState({error:"Une erreur s'est produite : "+data.message});
                            }
                        });
                    }
                }
            }
        }
        function SendRequest(data,tok,i){
            console.log("send Request");
            let url =
                SERVER_URL +
                "/matchmaking/request?matchmakingId="+data+"&token="
                +tok;
            axios.get(url).then(res=>{
                let data = res.data;
                if (data.status=="ok"){
                    alert("request send");
                    cont.props.history.push({state:{Deck:this.state.tableDeck[this.state.Deck]}});

                } else{
                    cont.setState({ error: "Une erreur s'est produite : " + data.message });
                }
            });
        }
        function test(DeckAPasser,matchmakingId,isLoad,error,cont){
            console.log("test");
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
        let final = '';

        function getCards(){
            console.log("get Cards");
            let url2=SERVER_URL + "/cards/getAll";
            axios.get(url2).then(res=>{
                let data=res.data;
                if(data.status==="ok") {
                    let tableD=[];
                    data = data.data;
                    for(let i=0;i<4;i++){
                        let temporary=(cont.randomPick(data,20));
                        tableD.push(temporary);
                    }
                    let champs=[];
                    //a quoi ca sert ?? a revoir
                    for(let i=0;i<tableD.length;i++){
                        for(let j=0;j<tableD[i].length;j++){
                            champs.push(tableD[i][j]);
                        }
                    }
                    let isLoad=true;
                    cont.setState({tableDeck:tableD,champs:champs,isLoaded:true});
                }else{
                    cont.setState({error:"Une erreur s'est produite : "+data.message,isLoaded:true});
                }
            });
        }
        const tok=this.props.location.state.token;
        let cont=this;
        let matchMaking=prevState.matchmakingId;
        let tabAdversaire=[];

        if(prevState.isLoaded==false){
            getCards();
        }else{
            setTimeout(function(){
                //console.log("set Timeout");
                participateMatchMaking(matchMaking);
                updateMatchMaking(tabAdversaire);
                cont.setState({matchmakingId:matchMaking,tabAdversaire:tabAdversaire});
            },800);
        }
    }

    componentWillReceiveProps(nextProps) {
        //console.log("componentwillReceiveProps");
        /*function handleMatchRequest(tabRequest,tok) {
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
        });*/
        alert("passe dans component will update");
    }
}
export default Game;