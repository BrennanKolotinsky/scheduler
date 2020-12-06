import React, { Component } from "react";
const axios = require('axios'); // use to send API requests!

class WeatherUI extends React.Component {

	constructor(props) {
    	super(props);

    	this.state = {
    		location: ""
    	};
    }

	findWeather() {
		axios(
			{
			  method: "GET", 
			  url: process.env.REACT_APP_LOCAL === 'true' ? "http://localhost:8080/weather" : "http://weatherbackend-env.eba-xftcnfcx.us-east-1.elasticbeanstalk.com/weather2",
			  crossDomain: true, 
			  data: {
			  	location: this.state.location
			  }
			}).then((response) => {
				this.setState({
					displayingData: true,
					weather: response.data.data.weather[0].description,
					lat: response.data.data.coord.lat,
					lon: response.data.data.coord.lon,
				})
			}
		);
	}

	updateCurrentLocation(e) {
		this.state.location = e.target.value;
	}

	handleKeyPress(e) {
	  if(e.key === 'Enter'){
	    this.findWeather();
	  }
	}

	render() {
		return(
			<div>
				<h2 className="marginAddedTop">
					Get a cities current weather!
				</h2>
				<input className="block" className="inputs" type="text" placeholder="Vancouver" onKeyPress={ (event) => this.handleKeyPress(event) } onChange= { (event) => this.updateCurrentLocation(event) }></input>
				<button className="inputs confirmBtn" onClick={ () => this.findWeather() }>Get Weather!</button>

				<div className="block" style={this.state.displayingData == true ? {} : { display : 'none' } }>
					<h3>Data loaded for: {this.state.location == '' ? "Vancouver" : this.state.location}!</h3>
					<h4>Weather: {this.state.weather}</h4>
					<h4>Latitude: {this.state.lat}, Longitude: {this.state.lon}</h4>
				</div>
			</div>
		);
	}
}

export default WeatherUI;