import React, { Component } from 'react';
import "./Layout.css";
import io from 'socket.io-client';
import axios from 'axios';
import user_ico from "../asets/user_ico.png";

export default class Layout extends Component {
    constructor(props){
        super(props);

        this.state = {
            socket:null,
            mensajes:[],
            prevMensajes:[],
            msj:'',
        };
        this.messagesEnd=null;
        this.baseUrl = 'http://localhost:4000/';
    }

    componentWillMount() {
        this.initSocket();
        this.prevData();
        
    }
    componentDidMount() {
        this.scrollToBottom();
    }
    
    componentDidUpdate() {
        this.scrollToBottom();
    }
    
    initSocket = ()=>{
        const socket = io(this.baseUrl);
        this.setState({socket});
        socket.on('chat',(data)=>{
            this.setState({mensajes:[...this.state.mensajes,data]});
        })
    }
    prevData = ()=>{
        axios.get(this.baseUrl+'chat').then((data)=>{
            this.setState({prevMensajes:data.data});
        });
    }
    addMsj = (e)=>{
        e.preventDefault();
        if(!this.state.msj)
            return;
        this.state.socket.emit('chat',{msj:this.state.msj,user:"TODO",date:new Date()});
        this.setState({msj:''});
    }
    setMsj = (e)=>{
        this.setState({msj:e.target.value});
    }
    scrollToBottom = () => {
        const scrollH = this.messagesEnd.scrollHeight;
        const height = this.messagesEnd.clientHeight;
        const maxScrollTop = scrollH - height;
        this.messagesEnd.scrollTop = maxScrollTop>0 ? maxScrollTop : 0;
    }
    

    dateFormat = (date)=>{
        if(!date)
            return;
        let objDate = new Date(date);
        let day = objDate.getDate();
        let month = objDate.getMonth()+1;
        let year = objDate.getFullYear();

        return `enviado el día ${day} del mes ${month} del año ${year}`;
    }
    render(){
        const { msj } = this.state;
        return(
            <div className="container">
                <div className="chat-msj-container scroll" ref={(ref)=>this.messagesEnd = ref}>
                    {this.state.prevMensajes.map((msj,indx)=>{
                        return (
                            <div key={indx+"-o"} className="chat-msj">
                                <hr/>
                                <div>
                                    <img src={user_ico} alt="user_ico" />
                                    <span>{msj.user}</span>
                                    <span>{this.dateFormat(msj.date)}</span>
                                </div>
                                <div >{msj.msj}</div>
                            </div>
                            
                        );
                    })}

                    {this.state.mensajes.map((msj,indx)=>{
                        return (
                            <div key={indx+"-n"} className="chat-msj">
                                <hr/>
                                <div>
                                    <img src={user_ico} alt="user_ico" />
                                    <span>{msj.user}</span>
                                    <span>{this.dateFormat(msj.date)}</span>
                                </div>
                                <div >{msj.msj}</div>
                            </div>
                        );
                    })}
                    
                </div>
                <div className="chat-msj-form">
                    <hr/>
                    <form onSubmit={this.addMsj}>
                        <input type="text" placeholder="Enviar mensaje a #general" onChange={this.setMsj} value={msj}></input>
                        <button type="button" onClick={this.addMsj}>&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;</button>
                    </form>
                </div>
            </div>
        );
    }

}