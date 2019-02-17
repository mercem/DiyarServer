const {User} = require('./model');
const _ = require('lodash');

module.exports.create = (req, res) => {
  const user = new User(_.pick(req.body, ['email', 'name', 'password']));
  user.save()
    .then(() => user.generateAuthToken())
    .then(token => {
      res.send({user, token});
    })
    .catch((e) => {
      res.status(400).send(e);
    })
}

module.exports.find = (req, res) => {
  User.find(req.query).then(docs => res.send(docs))
  .catch((e) => {
    res.status(400).send(e);
  })
}

module.exports.me = (req, res) => {
  res.send(req.user);
};

module.exports.findById = (req, res) => {
  User.findById(req.params.id).then(docs => res.send(docs))
  .catch((e) => {
    res.status(400).send(e);
  })
};


// Catch blockları
// Error returns
// Status