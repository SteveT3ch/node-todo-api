const { log } = console;
const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

let id = '5b9095c8e1858dd640357a45'

if (!ObjectID.isValid(id)) {
  return log('ID not valid');
}

User.findById(id).then((user) => {
  if (!user) {
    return log('User not found');
  }
  log('User ', user);
}).catch((e) => log(e));


// Todo.find({
//   _id: id
// }).then((todos) => {
//   log('Todos', todos);
// })
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return log('No result');
//   }
//   log('Todo by ID', todo);
// }).catch((e) => log(e));
