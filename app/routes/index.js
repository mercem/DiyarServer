const express = require('express');
const router = express.Router();
const app = express();
const users = require('../components/users/routes');
const models = require('../components/models/routes');
const categories = require('../components/categories/routes');

/* GET home page. */
app.get('/', function(req, res, next) {
  res.send('Diyar API');
});

app.use('/users', users);
app.use('/models', models);
app.use('/categories', categories);

//catches all other routes
app.all('*', (req, res) => {
  res.status(404).send({message: 'NOT FOUND'})
})

module.exports = app;