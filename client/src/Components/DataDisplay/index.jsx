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

    render() {
		const userJSON = localStorage.getItem('user');
		const user = JSON.parse(userJSON);

		return (
			<div className="marginAddedTop">
			{user !== null ? (
				<h2>Timesheet Page! {user.username}'s Data:</h2>
			) : 

			(<h2>No User Loaded</h2>)}

			</div>
		);
	}

}

export default DataDisplay;