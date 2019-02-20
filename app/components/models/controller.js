const {Model} = require('./model');
const _ = require('lodash');

module.exports.create = (req, res) => {
  const model = new Model({
    userId: req.user._id,
    name: req.body.name,
    category: req.body.category,
    prefabLink: req.body.prefabLink
  });
  model.save()
  .then(model => res.send(model))
  .catch(err => res.status(400).send(err))
};

module.exports.all = (req, res) => {
  Model.find()
  .then(models => res.send(models))
  .catch(err => res.status(404).send(err))
}

module.exports.me = (req, res) => {
  const user = req.user;
  Model.find({userId: user._id})
  .then(models => res.send(models))
  .catch(err => res.status(400).send(err))
};