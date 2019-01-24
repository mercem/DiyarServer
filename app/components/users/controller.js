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

module.exports.find = async (req, res, next) => {
  res.send(
    await User.find(req.body).then(docs => docs, error => error)
  );
}

module.exports.findById = async (req, res, next) => {
  console.log(req.params)
  res.send(
    await User.findById(req.params.id).then(docs => docs, error => error)
  );
}


// Catch blockları
// Error returns
// Status