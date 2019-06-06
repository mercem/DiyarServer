const express = require('express');
const path = require('path');

const app = express();
const {config} = require('./config');

config(app);
require('./db');

const routes = require('./src/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/v0', routes);

module.exports = app;
