const findUser = (connect, client, username, password) => {
  return connect.then(() => {
    const dbo = client.db("testDatabase");
    return dbo.collection("users").findOne({"username" : username, "password": password	});
  });
}

const createUser = (connect, client, username, password) => {
  return connect.then(() => {
    const dbo = client.db("testDatabase");
    return dbo.collection("users").insertOne({"username" : username, "password": password, "timesheets": null});
  });
}

exports.findUser = findUser;
exports.createUser = createUser;