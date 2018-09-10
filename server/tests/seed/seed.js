const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  email: 'test1@example.com',
  password: 'password123',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
  }]
},{
  _id: userTwoId,
  email: 'test2@example.com',
  password: 'password1234'
}]

const todos = [{
  _id: new ObjectID(),
  text: "rewatch doctor strange was right",
  completed: true,
  completedAt: 3333
}, {
  _id: new ObjectID(),
  text: "find out what was doc strange plan",
  completedAt: 4444
}];

const populateTodos = (done) => {
  Todo.deleteMany({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.deleteMany({}).then(() => {
    let userOne = new User(users[0]).save();
    let userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};


module.exports = { todos, populateTodos, users, populateUsers };
