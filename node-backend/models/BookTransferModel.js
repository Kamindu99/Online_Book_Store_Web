const mongoose = require('mongoose');

// Schema definition
const transferbookSchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true
    },
    person: {
        type: String,
        required: true
    },
    transferedate: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('transerbooks', transferbookSchema);
