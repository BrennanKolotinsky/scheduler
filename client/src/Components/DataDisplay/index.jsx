import React, { Component } from 'react';
import axios from 'axios';

class DataDisplay extends Component {
	constructor(props) {
    	super(props);

    	let userJSON = localStorage.getItem('user');
		let user = JSON.parse(userJSON);

    	this.state = {
    		startTime: null,
    		endTime: null,
    		user: user,
    		currentLogging: false,//user.currentLogging,
    		timeperiods: user.timeperiods
    	};
    }

    reloadUser = async () => {

    	// let's grab the user data
    	const userData = await axios(
	      {
	        method: "POST", 
	        url: "/api/login",
	        data: {
	        	username: localStorage.getItem('username'),
			  	password: localStorage.getItem('password'),
	        }
	      }
	    );

    	this.setState = {
    		user: userData.data.user,
    		currentLogging: userData.currentLogging,
    		timeperiods: userData.timeperiods,
    		doNotReload: true
    	};
    }

    startPeriod = async () => {
    	const userJSON = localStorage.getItem('user');
		const user = JSON.parse(userJSON);

		const {username, password} = user;
    	const newUser = await axios(
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

	    localStorage.setItem('user', JSON.stringify(newUser.data.user));
	    this.reloadUser();
    }

    endPeriod = async () => {
    	const userJSON = localStorage.getItem('user');
		const user = JSON.parse(userJSON);

		const {username, password} = user;

    	const newUser = await axios(
	      {
	        method: "POST", 
	        url: "/api/endPeriod",
	        data: {
	        	username: username,
			  	password: password,
			  	latestPeriod: user.latestPeriod,
			  	endTime: new Date(),
			  	authorization: "Bearer " + localStorage.getItem('token')
	        }
	      }
	    );

	    localStorage.setItem('user', JSON.stringify(newUser.data.user));

	    this.reloadUser();
    }

    render() {

    	if (this.props.authenticated && !this.state.doNotReload) {
    		this.reloadUser();
    	}

    	let {user} = this.state;
		
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

				<div style={this.state.currentLogging === false || this.state.currentLogging === undefined ? {} : { display : 'none' } }>
					<label>Start New Time Period</label>
					<button className="inputs confirmBtn block" onClick={ () => this.startPeriod() }>Start!</button>
				</div>

				<div style={this.state.currentLogging === true ? {} : { display : 'none' } }>
					<label>End Current Time Period (Started @ {user.latestPeriod})</label>
					<button className="inputs registerBtn block" onClick={ () => this.endPeriod() }>End!</button>
				</div>

				{this.state.timeperiods && this.state.timeperiods.length ? (
					<ul className="timeperiods marginAddedSmaller no-bullets">
						{this.state.timeperiods.map((timeperiod, index) =>
		                	<li key={index}>
		                  		{index + 1})<strong>Start:</strong> {timeperiod.startTime}; <strong>End:</strong> {timeperiod.endTime}
		                	</li>
		              	)}
	              	</ul>
				) : 
				(
					<h2 className="timeperiods marginAddedSmaller">No Time Periods Loaded</h2>
				)
			}
			</div>
		);
	}

}

export default DataDisplay;