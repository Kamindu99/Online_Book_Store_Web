const mongoose = require('mongoose');

// Schema definition
const categorySchema = new mongoose.Schema({
    categoryCode: {
        type: String,
        required: true
    },
    categoryName: {
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
    },
});

module.exports = mongoose.model('categories', categorySchema);
