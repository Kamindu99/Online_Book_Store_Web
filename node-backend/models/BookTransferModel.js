const mongoose = require('mongoose');

// Schema definition
const transferbookSchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    transferedate: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('transerbooks', transferbookSchema);
