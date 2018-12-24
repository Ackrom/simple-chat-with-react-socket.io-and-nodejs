import React, { Component } from 'react';
import Layout from './components/Layout'
import UserName from "./components/UserName";

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      user:null
    }
  }

  setUser = (user)=>{
    this.setState({user});
  }
  render() {
    const { user } = this.state;
    return (
      <div>
        {
          !user?
          <UserName setUser={this.setUser} />
          :
          <Layout user={this.state.user} />

        }
      </div>
    );
  }
}

export default App;
