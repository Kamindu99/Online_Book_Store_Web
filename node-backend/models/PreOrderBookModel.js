const mongoose = require('mongoose');

// Schema definition
const preOrderBookSchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    comment: {
        type: String
    },
    approverComment: {
        type: String
    },
    status: {
        type: String,
        default: "Pending"
    },
    approvedDate: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('preorderbooks', preOrderBookSchema);
