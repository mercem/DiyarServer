const {mongoose} = require('../../../db');

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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const Model = mongoose.model('Model', schema)

module.exports = {Model}