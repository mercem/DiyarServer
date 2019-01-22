const {User} = require('./model');

module.exports.create = async (req, res, next) => {
  const user = new User({
    email: req.body.email,
    name: req.body.name
  });
  res.send(
    await user.save().then(doc => doc, error => error)
  );
}

module.exports.get = async (req, res, next) => {
  res.send(
    await User.find().then(docs => docs, error => error)
  );
}
