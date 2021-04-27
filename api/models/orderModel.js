const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        orderImg: {
            type: String,
        },
        title: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        },
        totalPrice: {
            type: Number,
            required: [true, 'Please add a price']
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