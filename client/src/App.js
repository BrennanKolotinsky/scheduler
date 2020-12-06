import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Login from "./Components/Login/index.jsx";
import Module from 'module';

class App extends Component {
  // Initialize state
  state = {
    passwords: [],
    authenticated: null, // start with null so that the page loads empty until tokens are checked
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

    this.displayData(validToken.data.auth === undefined ? false : validToken.data.auth);
  }

  displayData = (auth) => {
    this.setState({authenticated: auth});
  }

  render() {
    const { passwords } = this.state;

    return (
      <div className="App">
        <div style={this.state.authenticated === false ? {} : { display : 'none' } }>
          <Login displayData={ this.displayData } authenticated={ this.state.authenticated }  />
        </div>
      </div>
    );
  }
}

export default App;