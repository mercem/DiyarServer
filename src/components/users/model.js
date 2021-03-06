const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const {getHmac, verifyPassword} = require('./helper');
const JWT_KEY = process.env.JWT_KEY;

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
    required: [true, 'name is required.'],
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
  contacts: {
    instagram: {
      type: String,
    },
    yemeksepeti: {
      type: String,
    },
    facebook: {
      type: String,
    }
  },
  role: {
    type: Number,
    default: 2, // regular user
  }
}, {
  timestamps: true,
  toObject: { virtuals: true} // necessary for virtual population. In toJson Function it calls this.
}); 

// ----- METHODS -----
schema.methods.generateAuthToken = function () {
  let user = this;
  const access = 'auth';
  const token = jwt.sign({_id: user._id.toHexString(), access}, JWT_KEY).toString(); 
  user.tokens = user.tokens.concat([{access, token}]);
  return user.save().then(() => token);
}

schema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email', 'name', 'contacts','models']);
}


// ----- STATICS -----
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

// ----- MIDDLEWARES -----
schema.pre('save', function(next){
  const user = this;
  if(user.isModified('password')){
    user.password = getHmac(user.password);
  }
  next();
});

schema.pre('remove', async function() {
  await mongoose.model('Model').remove({user: this._id})
})

schema.statics.findByCredentials = function (creds) {
 const User = this;
 return User.findOne({email: creds.email}).then(async function(user){
   if(!user) return Promise.reject('User not found.');
   if(verifyPassword(creds.password, user.password)){
    let token = await user.generateAuthToken();
    // console.warn(token);
    // console.warn({user, token});
    return Promise.resolve({user, token})
   };
   return Promise.reject('Incorrect password.')
 }).catch(err => Promise.reject(err));
};


// ----- VIRTUALS -----
schema.virtual('tokenCount').get(function () {
  return this.tokens.length
});

schema.virtual('models', {
  ref: 'Model',
  localField: '_id',
  foreignField: 'user'
}); // meWithModels functions uses this.

const User = mongoose.model('User', schema);
const Roles = {
  admin: 1,
  regular: 2,
};  

module.exports = {User, Roles};