import React, { Component } from 'react';
import axios from 'axios';

class DataDisplay extends Component {
	constructor(props) {
    	super(props);

    	this.state = {
    		startTime: null,
    		endTime: null,
    	};
    }

    startPeriod = async () => {
    	const userJSON = localStorage.getItem('user');
		const user = JSON.parse(userJSON);

		const {username, password} = user;

    	const loginAttempt = await axios(
	      {
	        method: "POST", 
	        url: "/api/addPeriod",
	        data: {
	        	username: username,
			  	password: password,
			  	startTime: new Date(),
			  	authorization: "Bearer " + localStorage.getItem('token')
	        }
	      }
	    );

		localStorage.setItem('user', JSON.stringify(loginAttempt.data.user));
    }

    endPeriod = async () => {
    	
    }

    render() {
		const userJSON = localStorage.getItem('user');
		const user = JSON.parse(userJSON);

		return (
			<div className="marginAddedTop">
				{user !== null ? 
					(
						<h2>Timesheet Page! {user.username}'s Data:</h2>	
					) : 
					(
						<h2>No User Loaded</h2>
					)
				}

				<div style={user.currentLogging === false || user.currentLogging === undefined ? {} : { display : 'none' } }>
					<label>Start New Time Period</label>
					<button className="inputs confirmBtn block" onClick={ () => this.startPeriod() }>Start!</button>
				</div>

				<div style={user.currentLogging === true ? {} : { display : 'none' } }>
					<h3>End Current Time Period</h3>
					<button className="inputs registerBtn block" onClick={ () => this.endPeriod() }>Start!</button>
				</div>

			</div>
		);
	}

}

export default DataDisplay;