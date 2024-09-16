const mongoose = require('mongoose');

// Schema definition
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
        type: Number,
        required: true
    },
    noOfPages: {
        type: Number,
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
