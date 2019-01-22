const {mongoose} = require('../../../db');

const Model = mongoose.model('Model', {
    name: {
        type: String,
        required: true
    },
    //TODO bind to category
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
        default: ''
    }
})

module.exports = {Model}