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
		const { username, password } = this.state;

		if (username === '' || password === '')
			alert("Incomplete login info!");

		const loginAttempt = await axios(
	      {
	        method: "POST", 
	        url: "/api/login",
	        data: {
	        	username: username,
			  	password: password,
	        }
	      }
	    );

	    if (loginAttempt.data.auth === true) {
	    	alert("Authenticated!");
			this.props.displayData(true);
			localStorage.setItem('token', loginAttempt.data.token); // set our token for easy login
	  		localStorage.setItem('user', JSON.stringify(loginAttempt.data.user));
	  		localStorage.setItem('username', username);
	  		localStorage.setItem('password', password);
	    } else {
	    	alert("Invalid username or password!");
	    }
	}

    render() {
		return (
			<div className="marginAddedTop">
				<h2>Login Page!</h2>

				<input className="block inputs" type="text" placeholder="username (admin)" onKeyPress={ (event) => this.handleKeyPress(event) } onChange= { (event) => this.updateUserName(event) }></input>
				<input className="block marginAddedLeft inputs" type="password" placeholder="password (test)" onKeyPress={ (event) => this.handleKeyPress(event) } onChange= { (event) => this.updatePassword(event) }></input>
				<button className="inputs confirmBtn" onClick={ () => this.checkAuth() }>Login</button>
				<div>
					<button className="inputs registerBtn marginAddedSmaller" onClick={ () => this.props.updateRegistration(true) }>Register</button>
				</div>
			</div>
		);
	}

}

export default Login;