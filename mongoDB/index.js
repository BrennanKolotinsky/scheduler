const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:test@cluster0.ne16p.mongodb.net/testDatabase?retryWrites=true&w=majority"
let client, connection;

const connectToDb = (function() {
  client = new MongoClient(url, { useUnifiedTopology: true });
  connection = client.connect();
}())

exports.client = client;
exports.connection = connection;