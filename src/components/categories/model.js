const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  image: {
    type: String,
    required: true,
    default: null
  }      
})

module.exports.Category = mongoose.model('Category', schema)
