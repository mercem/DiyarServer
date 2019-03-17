require('./configs');
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT;
const routes = require('./app/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/v0', routes);

app.listen(port, () => {console.log(`Server is up at port ${port}`)});

module.exports = app;
