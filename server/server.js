/*jshint esversion: 6 */
var env = process.env.NODE_ENV || "developement";
if (env == 'developement') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/todoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/todoAppTest';
}
const _ = require('lodash');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {Users} = require('./models/user');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
//post toods
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});
//get todos
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  });
});
//get todos by id
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id))
    return res.status(404).send();

  Todo.findById(id).then((todo) => {
    if (todo)
      res.send({todo});
    else
      res.status(404).send();
  }, (err) => {
    res.status(400).send(err);
  });
});

//delete
app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id))
    return res.status(404).send();
  Todo.findByIdAndRemove(id).then((removedTodo) => {
    if (!removedTodo)
      return res.status(404).send();
    res.send({removedTodo});
  }, (err) => {
    res.status(400).send(err);
  });
});

//update
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id))
    return res.status(404).send();
  var body = _.pick(req.body, ['text', 'completed']);
  if (_.isBoolean(body.completed) && body.completed)
    body.completedAt = new Date().getTime();
  else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((err) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
