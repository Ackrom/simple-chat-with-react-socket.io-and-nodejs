import React, { Component } from 'react';
import "./Layout.css";
import io from 'socket.io-client';
import axios from 'axios';

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
            this.setState({mensajes:[...this.state.mensajes,data.msj]});
        })
    }
    prevData = ()=>{
        axios.get(this.baseUrl+'chat').then((data)=>{
            this.setState({prevMensajes:data.data});
        });
    }
    addMsj = (e)=>{
        e.preventDefault();
        this.state.socket.emit('chat',{msj:this.state.msj});
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
    
    render(){
        const { msj } = this.state;
        return(
            <div className="container">
                <div className="chat-msj-container" ref={(ref)=>this.messagesEnd = ref}>
                    {this.state.prevMensajes.map((msj,indx)=>{
                        return (
                            <div className="chat-msj" key={indx}>{msj.msj}</div>
                        );
                    })}

                    {this.state.mensajes.map((msj,indx)=>{
                        return (
                            <div className="chat-msj" key={indx}>{msj}</div>
                        );
                    })}
                    
                </div>
                <div>
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