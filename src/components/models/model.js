const mongoose = require('mongoose');
const {categories} = require('./helper')
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: categories.map(category => category.name)
  },
  subCategory: {
    type: String,
    required:true,
  },
  city: {
    type: String,
  },
  height: {
    type: Number,
    default: 5
  },
  prefabLinks: {
    type: Object,
    ios: {type: String},
    android: {type: String},
    validate: {
      validator: (links) => {
        return !!(links.ios || links.android);
      }
    },
    required: [true, 'Ios and/or Android Links are required.']
  },
  info: {
    type: String
  },
  imageUrl: {
    required: true,
    type: String,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {virtuals: true}
})

// ----- MIDDLEWARES -----
const autoPopulateOwner = function(next) {
  this.populate('user');
  next();
};

schema
  .pre('find', autoPopulateOwner)
  .pre('findOne', autoPopulateOwner)
  .pre('save', function(){
    const model = this;
    if(!categories
      .filter(cat => cat.name === model.category)[0]
      .subCategories
      .find(sub => sub.name === model.subCategory)){
        console.log('invalid');
        return Promise.reject('Invalid Subcategory');
      }
  })

const Model = mongoose.model('Model', schema)

module.exports = {Model}