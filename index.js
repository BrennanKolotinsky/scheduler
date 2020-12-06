const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');
const jwt = require("jsonwebtoken");

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/passwords', verifyToken, (req, res) => {
	// authData is the user
	jwt.verify(req.token, 'secretkey', (err, authData) => {
	    if(err) {
	      res.sendStatus(403);
	    } else {
	    	const count = 5;
			const passwords = Array.from(Array(count).keys()).map(i =>
			    generatePassword(12, false)
			);
			res.json(passwords);
			console.log(`Sent ${count} passwords`);
	    }
	});
});

app.post('/api/login', verifyToken, (req, res) => {
  // Mock user
  const user = {
    id: 1, 
    username: 'brad',
    email: 'brad@gmail.com'
  }

  // create the login token and send it back
  jwt.sign({user}, 'secretkey', (err, token) => {
    res.json({
      token
    });
  });
});

// Verify Token -- middleware
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);