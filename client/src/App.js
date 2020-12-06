import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Login from "./Components/Login/index.jsx";
import Register from "./Components/Registration/index.jsx";
import DataDisplay from "./Components/DataDisplay/index.jsx";
import Module from 'module';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class App extends Component {
  // Initialize state
  state = {
    authenticated: null, // start with null so that the page loads empty until tokens are checked
    register: false,
  }

  componentDidMount() {
    this.checkLoginToken(); // this stores a session to see if we have already logged in!
  }

  checkLoginToken = async () => {
    const validToken = await axios(
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
    if (this.state.authenticated === true) {
    }

    this.setState({authenticated: auth});
  }

  updateRegistration = (registering) => {
    this.setState({
      register: registering
    });
  }

  render() {
    return (
      <div className="App">
        <div style={this.state.authenticated === false && this.state.register === false ? {} : { display : 'none' } }>
          <Login displayData={ this.displayData } updateRegistration={ this.updateRegistration } authenticated={ this.state.authenticated }  />
        </div>

        <div style={this.state.authenticated === false && this.state.register === true ? {} : { display : 'none' } }>
          <Register displayData={ this.displayData } updateRegistration={ this.updateRegistration } />
        </div>

        <div style={this.state.authenticated === true ? {} : { display : 'none' } }>
          <DataDisplay authenticated={this.state.authenticated} />
        </div>
      </div>
    );
  }
}

export default App;