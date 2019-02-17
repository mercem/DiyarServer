const {mongoose} = require('../../../db');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  city: {
    type: String,
  },
  hqPrefabLink: {
    type: String,
  },
  lqPrefabLink: {
    type: String,
  },
  spriteUrl:{
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
})

const Model = mongoose.model('Model', schema)

module.exports = {Model}