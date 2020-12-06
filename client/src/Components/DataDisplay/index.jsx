import React, { Component } from 'react';
import axios from 'axios';

class DataDisplay extends Component {
	constructor(props) {
    	super(props);

    	this.state = {
    		doNotReload: false
    	};

  //   	let userJSON = localStorage.getItem('user');
		// let user = JSON.parse(userJSON);



    	// this.state = {
    	// 	startTime: null,
    	// 	endTime: null,
    	// 	user: user,
    	// 	currentLogging: false,//user.currentLogging,
    	// 	timeperiods: user.timeperiods
    	// };
    }

    reloadUser = async () => {

    	console.log("here");

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

    	this.setState({
    		user: userData.data.user,
    		currentLogging: userData.data.user.currentLogging,
    		timeperiods: userData.data.user.timeperiods,
    		doNotReload: true
    	});
    }

    startPeriod = async () => {
    	const userJSON = localStorage.getItem('user');
		const user = JSON.parse(userJSON);

		const {username, password} = user;
		const newTime = new Date();
    	const newUser = await axios(
	      {
	        method: "POST", 
	        url: "/api/addPeriod",
	        data: {
	        	username: username,
			  	password: password,
			  	startTime: newTime,
			  	authorization: "Bearer " + localStorage.getItem('token')
	        }
	      }
	    );

	    // this.state.timeperiods.push({startTime: newTime})
		localStorage.setItem('user', JSON.stringify(newUser.data.user));
	    
	    this.setState({
	    	currentLogging: true,
	    });
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

	    this.setState({
	    	user: newUser,
	    	timeperiods: user.timeperiods
	    	// currentLogging: false,
	    });
    }

    render() {

    	console.log("state", this.state);
    	console.log(this.props.authenticated);
    	if (this.props.authenticated && !this.state.doNotReload) {
    		this.reloadUser();
    	}

    	let {user} = this.state;
		
		return (
			<div className="marginAddedTop">
				{user !== null && user !== undefined && user.username !== null && user.username !== undefined ? 
					(
						<h2>Timesheet Page! {user.username}'s Data:</h2>	
					) : 
					(
						<h2>No User Loaded</h2>
					)
				}

				{this.state.currentLogging !== null && this.state.currentLogging !== undefined && this.state.currentLogging === false ? (
					<div>
						<label>Start New Time Period</label>
						<button className="inputs confirmBtn block" onClick={ () => this.startPeriod() }>Start!</button>
					</div>
				) : 
				(
					<p></p>
				)
				}

				{this.state.currentLogging === true ? (
					<div>
						<label>End Current Time Period (Started @ {user.latestPeriod})</label>
						<button className="inputs registerBtn block" onClick={ () => this.endPeriod() }>End!</button>
					</div>
				) : 
				(
					<p></p>
				)
				}

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