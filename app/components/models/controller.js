const {Model} = require('./model');
const _ = require('lodash');

module.exports.create = (req, res) => {
  const model = new Model({
    userId: req.user._id,
    name: req.body.name,
    category: req.body.category,
    prefabLink: req.body.prefabLink,
    imageUrl: req.body.imageUrl
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

module.exports.deleteById = (req, res) => {
  Model.deleteOne({_id: req.params.id, userId: req.user._id})
  .then(() => res.send('Succesful'))
  .catch(err => res.send(err));
}

module.exports.me = (req, res) => {
  const user = req.user;
  Model.find({userId: user._id})
  .then(models => res.send(models))
  .catch(err => res.status(400).send(err))
};

module.exports.update = (req, res) => {
  Model.findById(req.body._id).then(model => {
    if(req.body.name) model.name = req.body.name;
    if(req.body.category) model.category = req.body.category;
    if(req.body.prefabLink) model.prefabLink = req.body.prefabLink;
    if(req.body.imageUrl) model.imageUrl = req.body.imageUrl;
    model.save().then(model => res.send(model)).catch(err => res.status(404).send(err))
  }).catch(err => res.status(404).send(err))
};