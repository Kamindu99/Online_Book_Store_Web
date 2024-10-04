const mongoose = require('mongoose');

// Schema definition
const bookreviewsSchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('bookreviews', bookreviewsSchema);
