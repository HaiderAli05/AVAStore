const router = require('express').Router();
const { registerValidator, loginValidator, validatorResult } = require('../middlewares/validator.js');
const { registerController,loginController, userUpdateController } = require('../controllers/user.js');
const adminVerify = require('../middlewares/verifyAdmin');

//POST Request for Create a new User Account
router.post('/register', registerValidator, validatorResult, registerController);

//POST Request for LogIn a User
router.post('/login', loginController);

//PUT request (Update any User)
router.put('/:id', adminVerify, userUpdateController);

module.exports = router;