const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDb Server');
  }
  console.log('Connected to MongoDb Server');
  /*
  db.collection('Todos').insertOne({
    text: 'Something to do',
    completed: false
  },
  (err, result) => {
    if (err) {
      return console.log('unable to insert todo');
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });
  db.collection('Users').insertOne({
    name: 'Andrew',
    age: 25,
    location: 'Phili'
  },
  (err, result) => {
    if (err) {
      return console.log('unable to insert Users');
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });
  */
  db.close();
});
