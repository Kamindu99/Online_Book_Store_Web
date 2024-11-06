const mongoose = require('mongoose');
const crypto = require('crypto');

// Schema definition
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        default: () => crypto.randomBytes(4).toString('hex')
    },
    isFirstLogin: {
        type: Boolean,
        default: true
    },
    resetOtp: String,
    resetOtpExpiry: Date,
    refreshToken: {
        type: String
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

module.exports = mongoose.model('users', userSchema);
