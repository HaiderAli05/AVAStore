const router = require('express').Router();
const mongoose = require('mongoose');
const Order = require('../models/orderModel');
const User = require('../models/userModel');
const adminVerify = require('../middlewares/verifyAdmin.js');
const userVerify = require('../middlewares/verifyUser.js');
//POST request (Add a new Order)
router.post('/addOrder',userVerify,async (req,res)=>{
    const {userId,userEmail,productId,title,unitPrice,quantity,totalPrice,status} = req.body;
    try {
        //Check if Order already Exists
        // const order = await Order.findOne({title: title});
        // if(order) {
        //     return res.status(400).json({message: 'Order already exist with same product.'});
        // }
        //Create a new Order instance
        const newOrder = new Order();
        _id: mongoose.Schema.Types.ObjectId;
        newOrder.userId = userId;
        newOrder.productId = productId;
        newOrder.userEmail = userEmail;
        newOrder.title = title;
        newOrder.unitPrice = unitPrice;
        newOrder.quantity = quantity || 1;
        newOrder.totalPrice = totalPrice;
        newOrder.status = status || 'Under Review';

        //Save new Order into Database
        const savedOrder = await newOrder.save();
        //Send response after Order Registered
        res.json({
            successMessage: 'Order Added.',
            error: null,
            data: savedOrder
        });
    } catch(err){
        res.status(400).json({message: `${err.message}`});
    }
});
//GET request (Show all Order)
router.get('/', adminVerify, async (req,res)=>{
    try{
        const allOrders = await Order.find({});
        res.json({
            message: 'All Orders',
            error: null,
            data: allOrders
        });
    }catch(err){
        res.status(400).json({message: `${err.message}`});
    }
});
//GET request for a Single Order
router.get('/:id', userVerify,async (req,res)=>{
    try{
        const userOrders = await Order.find({userId: req.params.id});
        res.json({
            message: 'Single Order',
            error: null,
            data: userOrders
        });
    }catch(err){
        res.status(400).json({message: `${err.message}`});
    }
});
//PUT request (Update any Order)
router.put('/:id', adminVerify, async (req,res)=>{
    try {
        const o_id = req.params.id;
        const updatedOrder = await Order.findByIdAndUpdate(o_id, req.body, {new: true});
        res.json({
            message: 'Order Updated Successfully',
            error: null,
            data: updatedOrder
        });
    }catch(err){
        res.status(400).json({message: `${err.message}`});
    }
});
//DELETE request (Delete any Order)
router.delete('/:id', adminVerify, async (req,res)=>{
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if(!req.params.id) return res.status(400).send({error:'Order ID not found!'});
            res.json({
                message: 'Order is Deleted',
                error: null,
                data: deletedOrder
            });
    }catch(err){
        res.status(404).json({message: `${err.message}`});
    }
});
//DELETE request for ALL Orders
router.delete('/', adminVerify, async (req,res)=>{
    try {
        const deletedOrders = await Order.deleteMany();
        res.json({
            message: 'All Orders are Deleted',
            error: null,
            data: deletedOrders
        });
    }catch(err){
        res.status(404).json({message: `${err.message}`});
    }
});

module.exports = router;