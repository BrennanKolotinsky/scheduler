import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  // Initialize state
  state = { passwords: [] }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = async () => {

    // login do this elsewhere once I have a login section!
    const token = await axios(
      {
        method: "POST", 
        url: "/api/login",
        data: {
        }
      }
    );

    localStorage.setItem('token', token);

    let passwords = await axios(
      {
        method: "POST", 
        url: "/api/passwords",
        data: {
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImJyYWQiLCJlbWFpbCI6ImJyYWRAZ21haWwuY29tIn0sImlhdCI6MTYwNzIxNjU2N30.mZZ3ETGcH-NOu7s-TE50kpXbC3Py0wuMXmUjUrtoMw8"
        }
      }
    );

    this.setState({ passwords: passwords.data })
  }

  render() {
    const { passwords } = this.state;

    return (
      <div className="App">
        {/* Render the passwords if we have them */}
        {passwords.length ? (
          <div>
            <h1>5 Passwords.</h1>
            <ul className="passwords">
              {/*
                Generally it's bad to use "index" as a key.
                It's ok for this example because there will always
                be the same number of passwords, and they never
                change positions in the array.
              */}
              {passwords.map((password, index) =>
                <li key={index}>
                  {password}
                </li>
              )}
            </ul>
            <button
              className="more"
              onClick={this.getPasswords}>
              Get More
            </button>
          </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <h1>No passwords :(</h1>
            <button
              className="more"
              onClick={this.getPasswords}>
              Try Again?
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;