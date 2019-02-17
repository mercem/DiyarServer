const {Model} = require('./model');
const _ = require('lodash');

module.exports.create = (req, res) => {
  const model = new Model({
    userId: req.user._id,
    name: req.body.name,
    category: req.body.category
  });
  model.save()
  .then(model => res.send(model))
  .catch(e => res.status(400).send(e))
};

module.exports.me = (req, res) => {
  const user = req.user;
  Model.find({userId: user._id})
  .then(models => res.send(models))
  .catch(e => res.status(400).send(e))
};