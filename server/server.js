require('./config/config');


const { log } = console;
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// POST /todos route
app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /todos route
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /todos/:id route
app.get('/todos/:id', (req, res) => {
  let id = req.params.id

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOne({_id: id}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});

  }).catch((e) => {
    res.status(400).send();
  });
});

// Delete /todos/:id route
app.delete('/todos/:id', (req, res) => {
  let id = req.params.id

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOneAndDelete({ _id: id}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});

  }).catch((e) => {
    res.status(400).send();
  })
});

// Update /todos/:id route
app.patch('/todos/:id', (req, res) =>{
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({_id: id}, {$set: body }, {new: true }).then((todo) =>{
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

// POST /users
app.post('/users', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);
  let user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) =>{
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});


// GET /users/me route
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});



app.listen(port, () => {
  log(`Listening on port ${port}`);
})

module.exports = { app };
