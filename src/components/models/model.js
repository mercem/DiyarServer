const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['food', 'decor', 'building']
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
  imageUrl: {
    required: true,
    type: String,
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

const Model = mongoose.model('Model', schema)

module.exports = {Model}