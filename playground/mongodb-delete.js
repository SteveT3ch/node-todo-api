const { log } = console;

//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return log('Unable to connect to MongoDB server');
  }
  log('Connected to MongoDB server');
  const db = client.db('TodoApp')

  // deleteMany
  db.collection('Todos')
    .deleteMany({text: 'pass devops'})
    .then((result) => {
      log(result);
    });

  // deleteOne
  db.collection('Todos')
    .deleteOne({text: 'pass devops'})
    .then((result) => {
      log(result);
    });

  // FindOneAndDelete
  db.collection('Todos')
    .findOneAndDelete({completed: true })
    .then((result) => {
      log(result);
    });



//  client.close();

});
