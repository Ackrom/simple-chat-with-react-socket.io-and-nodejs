import React, { Component } from 'react';
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

        this.baseUrl = 'http://localhost:4000/';
    }
    componentWillMount() {
        this.initSocket();
        this.prevData();
        
    }
    
    initSocket = ()=>{
        const socket = io(this.baseUrl);
        this.state.socket = socket;
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
        this.state.msj = this.setState({msj:e.target.value});
    }

    render(){
        const { msj } = this.state;
        return(
            <div>
                <div>
                    Mensajes:
                    <div>
                        {this.state.prevMensajes.map((msj,indx)=>{
                            return (
                                <div key={indx}>{msj.msj}</div>
                            );
                        })}

                        {this.state.mensajes.map((msj,indx)=>{
                            return (
                                <div key={indx}>{msj}</div>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <form onSubmit={this.addMsj}>
                        <input type="text" placeholder="Mensaje..." onChange={this.setMsj} value={msj}></input>
                        <button type="button" onClick={this.addMsj}>Enviar</button>
                    </form>

                    el mensaje es: {msj}
                </div>
            </div>
        );
    }

}