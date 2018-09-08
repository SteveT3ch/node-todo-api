const { log } = console;
const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// delete all

Todo.deleteMany({}).then((result) => {
  log(result);
});
