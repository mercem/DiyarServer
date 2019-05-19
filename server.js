const app = require('./app');
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is up at port ${port}`)
});

module.exports = app;