const {Model} = require('./model');
const _ = require('lodash');

module.exports.create = (req, res) => {
  const model = new Model({
    userId: req.user._id,
    name: req.body.name,
    category: req.body.category,
    prefabLinks: req.body.prefabLinks,
    imageUrl: req.body.imageUrl,
    height: req.body.height,
    info: req.body.info
  });
  model.save()
  .then(model => res.send(model))
  .catch(err => res.status(400).send(err))
}

module.exports.all = (req, res) => {
  Model.find(req.query)
  .then(models => res.send(models))
  .catch(err => res.status(404).send(err))
}

module.exports.findById = (req, res) => {
  Model.findById(req.params.id)
  .then(model => res.send(model))
  .catch(err => res.status(400).send(err))
}

module.exports.deleteById = (req, res) => {
  Model.remove({_id: req.params.id, userId: req.user._id})
  .then(() => res.send('Succesful'))
  .catch(err => res.send(err));
}

module.exports.mine = (req, res) => {
  const user = req.user;
  Model.find({userId: user._id})
  .then(models => res.send(models))
  .catch(err => res.status(400).send(err))
};

module.exports.update = (req, res) => {
  Model.findById(req.body._id).then(model => {
    if(req.body.name) model.name = req.body.name;
    if(req.body.category) model.category = req.body.category;
    if(req.body.prefabLinks){
      if(req.body.prefabLinks.ios) model.prefabLinks.ios = req.body.prefabLinks.ios;
      if(req.body.prefabLinks.android) model.prefabLinks.android = req.body.prefabLinks.android;
      model.markModified('prefabLinks'); // necessary when updating nested fields! 
    }
    if(req.body.imageUrl) model.imageUrl = req.body.imageUrl;
    if(req.body.height) model.height = req.body.height;
    if(req.body.info) model.info = req.body.info;
    model.save().then(model => res.send(model)).catch(err => res.status(404).send(err))
  }).catch(err => res.status(404).send(err))
};