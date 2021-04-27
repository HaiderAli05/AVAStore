const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter your name'],
        min: 3
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        min:4
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please enter password again in confirm password'],
        min:4
    },
    phone: {
        type: Number,
        required: [true, 'Please enter your phone number'],
    },
    country:{
        type: String,
        required: [true, 'Please enter your country'],
    },
    role:{
        type: Number,
        default: 0
    }
},
{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);