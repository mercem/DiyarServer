const {mongoose} = require('../../../db');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const crypto = require('crypto');	

const JWT_KEY = process.env.JWT_KEY;
const HMAC_KEY = process.env.HMAC_KEY;

const getHmac = (message) => {
  const hmac = crypto.createHmac('sha256', HMAC_KEY);
  return hmac.update(message).digest('hex')
}

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email is required.'],
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid.'
    }
  },
  name: {
    type: String,
    required: [true, 'password is required.'],
    minlength: 1,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'password is required.'],
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
      },
    token: {
      type: String,
      required: true
    }
  }],
  role: {
    type: Number,
    default: 2, // regular user
  }
}); 

schema.methods.generateAuthToken = function () {
  let user = this;
  const access = 'auth';
  const token = jwt.sign({_id: user._id.toHexString(), access}, JWT_KEY).toString(); 
  user.tokens = user.tokens.concat([{access, token}]);
  return user.save().then(() => token)
}

schema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email', 'name']);
}

schema.statics.findByToken = function(token) {
  const User = this;
  let decoded;
  try {
		decoded = jwt.verify(token, JWT_KEY);
  } catch(e) {
    return Promise.reject('Invalid Token');
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}      

schema.pre('save', function(next){
  const user = this;
  if(user.isModified('password')){
    user.password = getHmac(user.password);
  }
  next();
});

const User = mongoose.model('User', schema);
const Roles = {
  admin: 1,
  regular: 2,
};  

module.exports = {User, Roles};