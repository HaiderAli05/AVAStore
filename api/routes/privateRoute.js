const router = require('express').Router();
const userVerify = require('../middlewares/verifyUser');

router.get('/',userVerify,(req,res)=>{
    res.send('<h1>Welcome to this Private Page. (only for Registered Users)</h1>');
});

module.exports = router;