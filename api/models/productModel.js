const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productImg: {
        type: String,
        required: [true, 'Please add an image']
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
        unique: [true, 'Product already exist with same title']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    delivery: {
        type: String,
    }  
},
{
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema);