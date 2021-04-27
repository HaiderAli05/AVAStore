const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        },
        orderImg: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        qty: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: [true, 'Please add a price']
        },
        date: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
        }
    }],
      
},
{
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema);