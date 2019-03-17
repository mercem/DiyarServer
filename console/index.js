require('../configs');
var repl = require('repl');

var {User, Roles} = require('../app/components/users/model');
var {Model} = require('../app/components/models/model');

var envName = process.env.NODE_ENV || "dev";
var replServer = repl.start({
  prompt: "Diyar(" + envName + ")>",
});

replServer.context.User = User;
replServer.context.Model = Model;

console.log("Console is up and ready to roll!");