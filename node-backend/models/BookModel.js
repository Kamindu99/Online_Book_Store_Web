const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookCode: {
        type: String,
        required: true
    },
    bookName: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    noOfPages: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('books', bookSchema);