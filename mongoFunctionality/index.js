const findUser = (connect, client, username, password) => {
  return connect.then(() => {
    const dbo = client.db("testDatabase");
    return dbo.collection("users").findOne({"username" : username, "password": password	});
  });
}

const createUser = (connect, client, username, password) => {
  return connect.then(() => {
    const dbo = client.db("testDatabase");
    return dbo.collection("users").insertOne({"username" : username, "password": password, "timesheets": null, "currentLogging": false});
  });
}

const addPeriod = (connect, client, username, password, startTime) => {
  return connect.then(() => {
    const dbo = client.db("testDatabase");
    return dbo.collection("users").findOneAndUpdate(
    	{"username" : username, "password": password},
        { $set: {"currentLogging": true} }
    ).then(() => {
    	return dbo.collection("users").findOneAndUpdate(
	    	{"username" : username, "password": password},
	        {$push: { 
	          "timeperiods" : {startTime: startTime},
	        } }
        );
    }); 
  });
}

exports.findUser = findUser;
exports.createUser = createUser;
exports.addPeriod = addPeriod;