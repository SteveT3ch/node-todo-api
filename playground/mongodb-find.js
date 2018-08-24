const { log } = console;

//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return log('Unable to connect to MongoDB server');
  }
  log('Connected to MongoDB server');
  const db = client.db('TodoApp')
  db.collection('Todos').find({completed: false}).toArray().then((docs) => {
    log('Todos');
    log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    log('Unable to fetch todos', err);
  });


  client.close();

});
