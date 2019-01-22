const {mongoose} = require('../../../db');

const User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    role: {
        type: Number,
        default: 2, // regular user
    }
});

module.exports = {User};