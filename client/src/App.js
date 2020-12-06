import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Login from "./Components/Login/index.jsx";
import Module from 'module';

class App extends Component {
  // Initialize state
  state = {
    passwords: [],
    authenticated: false,
  }

  componentDidMount() {
    this.checkLoginToken(); // this stores a session to see if we have already logged in!
  }

  checkLoginToken = async () => {
    let validToken = await axios(
      {
        method: "POST", 
        url: "/api/checkLoginTokenIsValid",
        data: {
          token: localStorage.getItem('token')
        }
      }
    );

    if (validToken.data.auth === 1)
      this.displayData();
  }

  displayData = () => {
    this.setState({authenticated: true});
  }

  render() {
    const { passwords } = this.state;

    return (
      <div className="App">
        <div style={this.state.authenticated == false ? {} : { display : 'none' } }>
          <Login displayData={ this.displayData } authenticated={ this.state.authenticated }  />
        </div>
      </div>
    );
  }
}

export default App;