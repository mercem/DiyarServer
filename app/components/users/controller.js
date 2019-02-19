const {User} = require('./model');
const _ = require('lodash');

module.exports.create = (req, res) => {
  const user = new User(_.pick(req.body, ['email', 'name', 'password']));
  user.save()
    .then(() => user.generateAuthToken())
    .then(token => {
      res.send({user, token});
    })
    .catch((err) => {
      res.status(400).send(err);
    })
};

module.exports.login = (req, res) => {
  const creds = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(creds)
    .then(userAndToken => res.send(userAndToken))
    .catch(err => res.status(404).send(err))
}

module.exports.find = (req, res) => {
  User.find(req.query).then(docs => res.send(docs))
    .catch((err) => {
      res.status(400).send(err);
    })
};

module.exports.me = (req, res) => {
  res.send(req.user);
};

module.exports.findById = (req, res) => {
  User.findById(req.params.id).then(docs => res.send(docs))
  .catch((err) => {
    res.status(400).send(err);
  })
};


// Catch blockları
// Error returns
// Status