const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    birthdate: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('User', user_schema);
