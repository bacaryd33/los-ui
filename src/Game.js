import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SERVER_URL } from "./consts";
import Card from "./Card";
import "./App.css";
import "./card.css";
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
            cards:[],
            isLoaded:true,
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
        // console.log(hashPass);
        let hashPass=this.props.location.state.password;
        var saltRounds = 10; // cost factor
        //var hashPass = bcrypt.hashSync(this.props.location.state.password, saltRounds);
        let url=SERVER_URL+"/users/unsubscribe?email="+this.props.location.state.email+"&password="+hashPass+"&token="+this.props.location.state.token;
        axios.get(url).then(res=>{
            let data=res.data;
            if(data.status=="ok"){
                alert("sup compte ok12334");
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
        let url =
            SERVER_URL +
            "/users/disconnect";
        axios.get(url).then(res=>{
            let data=res.data;
            if(data.status=="ok") {
                let urlUnparticipate = SERVER_URL + "/matchmaking/unparticipate?matchmakingid=" + this.state.matchmakingid + "&token=" + this.props.location.state.token;
                axios.get(urlUnparticipate).then(res => {
                    let data = res.data;
                    if (data.status == "ok") {
                        alert(process.env.PUBLIC_URL);
                        this.props.history.push(process.env.PUBLIC_URL + "/signin");
                    } else {
                        alert("failure unparticipate");
                    }
                });
            }else{
                alert("failure disconnection");
            }
        });
        //this.props.history.push({pathname:process.env.PUBLIC_URL + "/"});
        //console.log(this.props);
    }

    handleMatchRequest(tabRequest){
        if(tabRequest.length>0){
            for(let elt of tabRequest){
                if(window.confirm(elt.name+" vous defie  voulez vous jouez")){
                    alert("debut match");
                }
            }
        }
    }

    randomPick(champs, number) {
        let rChamps = [];
        for (let i = 0; i < (number); i++) {
            let elem = champs.splice(Math.floor(Math.random() * champs.length), 1)[0];
            rChamps.push({"id": elem.key, "name": elem.name, "img": elem.key + "_0.jpg", flipped: true});
        }
        return rChamps;
    }
    generateCards(champs) {
        let cards = [];
        for (let i = 0; i < champs.length; i++) {
            cards.push(
                <Card id={champs[i][0].id}
                      name={champs[i][0].name}
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
                    <button onClick={this.handleUnsubscribe}>Unsubscribe</button>
                    <button onClick={this.handleDeconnexion}> Deconnexion</button>
                    <div className="colequal">
                        <h1> Choissez votre Deck </h1>
                        <section className="row" classID="board">
                            <p>Error</p>
                        </section>
                    </div>
                    <div className="colequal">
                        <h1>MatchMaking</h1>
                        <table id="tableMatchMaking" className="tableMatch">
                            <tr>
                                <th><h2>id</h2></th>
                                <th><h2>name</h2></th>
                            </tr>
                        </table>
                    </div>
                    <footer>
                        <div className="footerMatchMaking">
                            <input type="checkbox" id="aleamatch" onChange={this.handleRandomMatchMaking}
                                   checked={this.state.randomMatch}/>
                            <label htmlFor="horns">Lancer un match aleatoire</label>
                        </div>
                        <button id="buttonPlay"
                                className={this.state.readyToPlay ? "butMatchMakingSelected" : "butMatchMakingNotSelected"}>Jouer
                        </button>

                    </footer>
                </div>
            );
        } else if (!isLoaded){
            return (<div className="Appli">
                    <button onClick={this.handleUnsubscribe}>Unsubscribe</button>
                    <button onClick={this.handleDeconnexion}>Deconnexion</button>
                    <div className="colequal">
                        <h1> Choissez votre Deck </h1>
                        <section className="row" classID="board">
                            <p>Loading</p>
                        </section>
                    </div>
                    <div className="colequal">
                        <h1>MatchMaking</h1>
                        <table id="tableMatchMaking" className="tableMatch">
                            <tr>
                                <th><h2>id</h2></th>
                                <th><h2>name</h2></th>
                            </tr>
                        </table>
                    </div>
                    <footer>
                        <div className="footerMatchMaking">
                            <input type="checkbox" id="aleamatch" onChange={this.handleRandomMatchMaking}
                                   checked={this.state.randomMatch}/>
                            <label htmlFor="horns">Lancer un match aleatoire</label>
                        </div>
                        <button id="buttonPlay"
                                className={this.state.readyToPlay ? "butMatchMakingSelected" : "butMatchMakingNotSelected"}>Jouer
                        </button>

                    </footer>
                </div>
            );
        }else{
            let cards=this.generateCards(tableD);
            return(<div className="Appli">
                <button onClick={this.handleUnsubscribe}>Unsubscribe</button>
                <button onClick={this.handleDeconnexion}>Deconnexion</button>
                <div className="colequal">
                    <h1> Choissez votre Deck </h1>
                    <section className="row">
                        {cards}
                    </section>
                </div>
                <div className="colequal">
                    <h1>MatchMaking</h1>
                    <table id="tableMatchMaking" className="tableMatch">
                        <tr>
                            <th><h2>id</h2></th>
                            <th><h2>name</h2></th>
                        </tr>
                    </table>
                </div>
                <footer>
                    <div className="footerMatchMaking">
                        <input type="checkbox" id="aleamatch" onChange={this.handleRandomMatchMaking}
                               checked={this.state.randomMatch}/>
                        <label htmlFor="horns">Lancer un match aleatoire</label>
                    </div>
                    <button id="buttonPlay"
                            className={this.state.readyToPlay ? "butMatchMakingSelected" : "butMatchMakingNotSelected"}>Jouer
                    </button>

                </footer>
            </div>);
        }
    }

    componentDidMount() {
        function SendRequest(data,tok,i){
            let url =
                SERVER_URL +
                "/matchmaking/request?matchmakingId="+data+"&token="
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
        let url23=SERVER_URL+"/matchmaking/participate?&token="+this.props.location.state.token;
        axios.get(url23).then(res=>{
            let data=res.data;
            if(data.status=="ok"){
                this.setState({matchmakingid:data.data["matchmakingId"]});
            }else{
                this.setState({error: "Une erreur s'est produite : " + data.message});
            }
        })
        let tok=this.props.location.state.token;
        let cont=this;
        setTimeout(function (cont){
            let url=SERVER_URL +
                "/matchmaking/getAll?&token="
                +this.props.location.state.token;
            axios.get(url).then(res => {
                var datafgf;
                datafgf = res.data;
                if (datafgf.status === "ok") {
                    let allRequest=datafgf.request;
                    console.log(" request"+allRequest);
                    cont.handleMatchRequest(allRequest);
                    datafgf=datafgf.data;
                    let tableM=document.getElementById("tableMatchMaking");
                    for( let i=0;i<datafgf.length;i++){
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
        }.bind(this),
        1500);

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
    componentWillReceiveProps(nextProps) {
        function SendRequest(data,tok,i){
            let url =
                SERVER_URL +
                "/matchmaking/request?matchmakingId="+data+"&token="
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
        let url2 =
            SERVER_URL +
            "/matchmaking/getAll?&token="
            +this.props.location.state.token;
        axios.get(url2).then(res => {
            let datafgf;
            datafgf = res.data;
            if (datafgf.status === "ok") {
                let allRequest=datafgf.request;
                console.log(" reuest"+allRequest);
                datafgf=datafgf.data;
                let tableM=document.getElementById("tableMatchMaking");
                tableM.innerHTML="";
                for( let i=0;i<datafgf.length;i++){
                    if(datafgf[i]["matchmakingId"]!=this.state.matchmakingid){
                        let  l1=tableM.insertRow(-1);
                        let cellId=l1.insertCell(-1);
                        let cellN=l1.insertCell(-1);
                        let matchMaking=datafgf[i]["matchmakingId"];
                        cellId.innerHTML=datafgf[i]["matchmakingId"];
                        cellN.innerHTML=datafgf[i]["name"];
                        l1.onclick=function(){
                            SendRequest(matchMaking,this.props.location.state.token,i);
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
        let url=SERVER_URL +
            "/cards/getAll";
        axios.get(url).then(res=>{
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