const mongoose = require('mongoose');

// Schema definition
const systemCalandarSchema = new mongoose.Schema({
    holidayDate: {
        type: String,
        required: true
    },
    reason: {
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

module.exports = mongoose.model('holidayCalandars', systemCalandarSchema);
