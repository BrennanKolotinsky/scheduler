import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
	constructor(props) {
    	super(props);

    	this.state = {
    		username: '',
    		password: '',
    	};
    }

    updateUserName(e) {
		this.state.username = e.target.value;
	}

	updatePassword(e) {
		this.state.password = e.target.value;
	}

	handleKeyPress(e) {
	  if(e.key === 'Enter'){
	    this.checkAuth();
	  }
	}

	checkAuth = async () => {
		if (this.state.username === '' || this.state.password === '')
			alert("Incomplete login info!");

		const loginAttempt = await axios(
	      {
	        method: "POST", 
	        url: "/api/login",
	        data: {
	        	username: this.state.username,
			  	password: this.state.password,
	        }
	      }
	    );

	    if (loginAttempt.data.auth === 1) {
	    	alert("Authenticated!");
			this.props.displayData();
			localStorage.setItem('token', loginAttempt.data.token); // set our token for easy login
	    } else {
	    	alert("Invalid username or password!");
	    }
	}

    render() {

		return (
			<div className="marginAddedTop">
				<h2>Login Page!</h2>

				<input className="block inputs" type="text" placeholder="username" onKeyPress={ (event) => this.handleKeyPress(event) } onChange= { (event) => this.updateUserName(event) }></input>
				<input className="block marginAddedLeft inputs" type="password" placeholder="password" onKeyPress={ (event) => this.handleKeyPress(event) } onChange= { (event) => this.updatePassword(event) }></input>
				<button className="inputs confirmBtn" onClick={ () => this.checkAuth() }>Login</button>
			</div>
		);
	}

}

export default Login;