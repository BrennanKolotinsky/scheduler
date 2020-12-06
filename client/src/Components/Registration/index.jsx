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
	    this.createUser();
	  }
	}

	createUser = async () => {

		const { username, password } = this.state;

		if (username === '' || password === '')
			alert("Incomplete registration info!");

		const registration = await axios(
	      {
	        method: "POST", 
	        url: "/api/register",
	        data: {
	        	username: username,
			  	password: password,
	        }
	      }
	    );

		this.props.displayData(true);
		this.props.updateRegistration(false);
	    localStorage.setItem('token', registration.data.token); // set our token for easy login
	    localStorage.setItem('username', username);
	    localStorage.setItem('password', password);
	}

    render() {

		return (
			<div className="marginAddedTop">
				<h2>Registration Page!</h2>

				<div>
					<label>Username: </label>
					<input className="block inputs" type="text" placeholder="Bob" onKeyPress={ (event) => this.handleKeyPress(event) } onChange= { (event) => this.updateUserName(event) }></input>
				</div>

				<div>
					<label>Password: </label>
					<input className="block inputs" type="password" placeholder="Testing123" onKeyPress={ (event) => this.handleKeyPress(event) } onChange= { (event) => this.updatePassword(event) }></input>
				</div>

				<div>
					<button className="inputs confirmBtn marginAddedSmaller" onClick={ () => this.createUser() }>Register</button>
				</div>
			</div>
		);
	}

}

export default Login;