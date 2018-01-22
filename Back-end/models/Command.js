const mongoose = require('mongoose');

const command_schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    product: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    }],
    deleted: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('Command', command_schema);
