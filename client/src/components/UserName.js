import React,{ Component } from "react";
import "./UserName.css"

export default class UserName extends Component{

    constructor(props){
        super(props);

        this.state={
            name:''
        };
    }
    setName = (event)=>{
        if (!event)
            return;
        this.setState({name:event.target.value});
        
    }
    onSubmit = (event)=>{
        event.preventDefault();
        this.props.setUser(this.state.name);
    }
    render(){
        return (
            <div className="container user-name-container"> 
                <div>
                    <h1>Nombre de usuario</h1>
                    <form  onSubmit={this.onSubmit}>
                        
                        <input placeholder="Nombre de usuario cool" value={this.state.name} name='userName' onChange={this.setName} ref={(val)=>console.log(val)} />
                        <button>Usar este nombre</button>
                    </form>
                </div>
            </div>
        );
    }

}