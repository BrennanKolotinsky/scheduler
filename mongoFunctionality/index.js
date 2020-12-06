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
        { $set: {"currentLogging": true, "latestPeriod": startTime} }
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

const endPeriod = (connect, client, username, password, endTime, latestPeriod) => {
  return connect.then(() => {
    const dbo = client.db("testDatabase");
    	return dbo.collection("users").findOneAndUpdate(
	    	{"username" : username, "password": password, "timeperiods.startTime": latestPeriod},
	        {$set: {
	          "timeperiods.$.endTime": endTime,
            "currentLogging": false,
          } }
        );
  });
}

exports.findUser = findUser;
exports.createUser = createUser;
exports.addPeriod = addPeriod;
exports.endPeriod = endPeriod;