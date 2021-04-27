const router = require('express').Router();
const Order = require('../models/orderModel');
const adminVerify = require('../middlewares/verifyAdmin');
const userVerify = require('../middlewares/verifyUser');
const bothVerify = require('../middlewares/verifyBoth');


