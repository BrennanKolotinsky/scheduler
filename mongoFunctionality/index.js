const findUser = (connect, client, username, password) => {
  return connect.then(() => {
    const dbo = client.db("testDatabase");
    return dbo.collection("users").findOne({"username" : username, "password": password	});
  });
}

exports.findUser = findUser;