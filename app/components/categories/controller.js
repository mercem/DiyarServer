const { Category} = require('./model');
const _ = require('lodash');

module.exports.create = (req, res, next) => {
  let category = new Category(_.pick(req.body, ['name', 'image']));
  category.save().then(doc => doc).catch((e) => {
    res.status(400).send(e);
  })
}

module.exports.get = (req, res, next) => {
  Category.find().then(docs => docs).catch((e) => {
    res.status(400).send(e);
  })
}