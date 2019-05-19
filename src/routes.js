const express = require('express');
const app = express();
const users = require('./components/users/routes');
const models = require('./components/models/routes');
const categories = require('./components/categories/routes');

/* GET home page. */
app.get('/', function(req, res,) {
  res.send('Diyar API v0');
});

app.use('/users', users);
app.use('/models', models);
app.use('/categories', categories);

//Catches all other routes
app.all('*', (req, res) => {
  res.status(404).send({message: 'NOT FOUND'})
})

module.exports = app;