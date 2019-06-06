module.exports.config = (app) => {
  if(process.env.NODE_ENV != 'production') {
    require('dotenv').config({path: `config/${process.env.NODE_ENV}.env`});
    app.use(function (req, res, next) {
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Content-Type,x-auth');
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);
      next();
    });
  }
}

console.log('NODE_ENV:', process.env.NODE_ENV)
