const {mongoose} = require('../../../db');

module.exports.Category = mongoose.model('Category',  {
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
