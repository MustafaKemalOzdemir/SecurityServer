const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    userName: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },



});

module.exports = {
    model: mongoose.model('Users', userSchema),
    schema: userSchema
}