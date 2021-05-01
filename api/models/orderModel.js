const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
        userId: {
            type: String,
            ref: 'User',
            required: true
        },
        userEmail:{
            type: String,
            required: true
        },
        productId: {
            type: String,
            ref: 'Product',
            required: true
        },
        title: {
            type: String,
            required: true
        },
        unitPrice: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        },
        totalPrice: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            require: true
        }
},
{
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema);