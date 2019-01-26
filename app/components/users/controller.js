const {User} = require('./model');
const _ = require('lodash');

module.exports.create = (req, res, next) => {
  const user = new User(_.pick(req.body, ['email', 'name']));
  user.save().then(() => user.generateAuthToken()).then(token => {
    res.send({user, token});
  }).catch((e) => {
    res.status(400).send(e);
  })
}

module.exports.find = (req, res, next) => {
  User.find(req.body).then(docs => res.send(docs)).catch((e) => {
    res.status(400).send(e);
  })
}

module.exports.findById = (req, res, next) => {
  User.findById(req.params.id).then(docs => res.send(docs)).catch((e) => {
    res.status(400).send(e);
  })
}


// Catch blockları
// Error returns
// Status