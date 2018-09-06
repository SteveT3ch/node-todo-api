const { log } = console;

//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return log('Unable to connect to MongoDB server');
  }
  log('Connected to MongoDB server');
  const db = client.db('TodoApp')

db.collection('Todos').findOneAndUpdate({
  _id: new ObjectID('5b7fb386f40cdd56622b315a')
}, {
  $set: {
    completed: true
  }
}, {
  returnOriginal: false
}).then((result) =>{
  log(result);
});

//  client.close();

});
