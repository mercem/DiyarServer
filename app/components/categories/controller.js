const { Category} = require('./model');
const _ = require('lodash');

module.exports.create = (req, res) => {
  let category = new Category(_.pick(req.body, ['name', 'image']));
  category.save()
  .then(category => res.send(category))
  .catch((err) => res.status(400).send(err))
}

module.exports.all = (req, res) => {
  Category.find()
  .then(categories => res.send(categories))
  .catch((err) =>res.status(400).send(err))
}