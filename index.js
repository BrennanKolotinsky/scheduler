const express = require('express');
const generatePassword = require('password-generator');
const bodyParser = require('body-parser');  // req.body now supplies information!
const jwt = require("jsonwebtoken"); // web tokens
const path = require('path'); // this allows us to easily combine paths

// created a mongodb server hosted on mongoatlas to hold users!
const mongoConnection = require('./mongoDB/index.js');
const mongoFunctionality = require('./mongoFunctionality/index.js');
const mongoDBConnection = mongoConnection.connection; // pass this client in the future to the other calls and then do .then -- like this: https://stackoverflow.com/questions/18650890/keeping-open-a-mongodb-database-connection
const mongoDBClient = mongoConnection.client;

const app = express();
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/api/checkLoginTokenIsValid', (req, res) => {
	// authData is the user
  const token = req.body.token;
	jwt.verify(token, 'secretkey', (err, authData) => {
	    if(err) {
        res.json({error: err});
	      // res.sendStatus(403);
	    } else {
			  res.json({auth: 1});
	    }
	});
});

app.post('/api/login', async (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  const user = await mongoFunctionality.findUser(mongoDBConnection, mongoDBClient, username, password);

  if (user !== null) {
    // create the login token and send it back
    jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
      res.json({
        token,
        auth: true
      });
    });
  } else {
    res.send({
      auth: false
    });
  }  
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