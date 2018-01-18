const mongoose = require('mongoose');

const product_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    categories: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    memory: {
        type: Number,
        required: true
    },
    hertz: {
        type: Number,
        required: true
    },
    os: {
        type: String,
        required: true,
    },
    guarantee: {
        type: Number
    },
    email: {
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

module.exports = mongoose.model('Product', product_schema);
