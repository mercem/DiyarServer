const { Category} = require('./model');


module.exports.create = async (req, res, next) => {
  let category = new Category({
    name: req.body.name,
    image: req.body.image
  });
  res.send(
    await category.save().then(doc => doc, error => error)
  );
}

module.exports.get = async (req, res, next) => {
  res.send(
    await Category.find().then(docs => docs, error => error)
  )
}