const mongoose = require('mongoose');

const certificateSchema = mongoose.Schema({

    userName: {
        type: String,
        required: true
    },

    certificate: {
        type: String,
        required: true
    },



});

module.exports = {
    model: mongoose.model('Certificates', certificateSchema),
    schema: certificateSchema
}