const router = require('express').Router();
const Product = require('../models/productModel');
const adminVerify = require('../middlewares/verifyAdmin');
const userVerify = require('../middlewares/verifyUser');
const bothVerify = require('../middlewares/verifyBoth');
const uploadPics = require('../middlewares/uploadPics');

//POST request (Add a new Product)
router.post('/addproduct',adminVerify,async (req,res)=>{
    uploadPics(req,res, async (err)=>{
        const productExist = await Product.findOne({title: req.body.title});
        if(req.file == undefined){
            return res.status(400).json({message: 'Please add an image'});//Check if Image added or not
        }else if(productExist){
            return res.status(400).json({message: 'Product already exist with same title.'});//Check if product already Exists
        }else{
            //Add a new Product
            const product = new Product({
                productImg: req.file.path,
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                delivery: req.body.delivery
            });
            try{
                const savedProduct = await product.save();
                res.json({
                    message: 'Product Added.',
                    error: null,
                    data: savedProduct
                });
            }catch(err){
                res.status(400).json({message: `${err.message}`});
            }
        }
    });
});
//GET request (Show all Products)
router.get('/',async (req,res)=>{
    try{
        const allProducts = await Product.find({});
        res.json({
            message: 'All Products',
            error: null,
            data: allProducts
        });
    }catch(err){
        res.status(400).json({message: `${err.message}`});
    }
});
//GET request for a Single Product
router.get('/:id',bothVerify, async (req,res)=>{
    try{
        const thisProduct = await Product.findById({_id: req.params.id});
        res.json({
            message: 'Single Product',
            error: null,
            data: thisProduct
        });
    }catch(err){
        res.status(400).json({message: `${err.message}`});
    }
});
//PUT request (Update any Product)
router.put('/:id', adminVerify, async (req,res)=>{
    try {
        const p_id = req.params.id;
        const updatedProduct = await Product.findByIdAndUpdate(p_id, req.body, {new: true});
        res.json({
            message: 'Product Updated Successfully',
            error: null,
            data: updatedProduct
        });
    }catch(err){
        res.status(400).json({message: `${err.message}`});
    }
});
//DELETE request (Delete any Product)
router.delete('/:id', adminVerify, async (req,res)=>{
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if(!req.params.id) return res.status(400).send({error:'User ID not found!'});
            res.json({
                message: 'Product is Deleted',
                error: null,
                data: deletedProduct
            });
    }catch(err){
        res.status(404).json({message: `${err.message}`});
    }
});
//DELETE request for ALL Products
router.delete('/', adminVerify, async (req,res)=>{
    try {
        const deletedProducts = await Product.deleteMany();
        res.json({
            message: 'All Products are Deleted',
            error: null,
            data: deletedProducts
        });
    }catch(err){
        res.status(404).json({message: `${err.message}`});
    }
});

module.exports = router;