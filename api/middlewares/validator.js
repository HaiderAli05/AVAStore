const {check, validationResult} = require('express-validator');

exports.registerValidator = [
    check('firstName').not().isEmpty().trim().withMessage('All fields required'),
    check('lastName').not().isEmpty().trim().withMessage('All fields required'),
    check('email').isEmail().normalizeEmail().withMessage('Invalid Email'),
    check('password')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters long'),
    check('phone').not().isEmpty().trim().withMessage('All fields required'),
    check('country').not().isEmpty().trim().withMessage('All fields required'),
]

exports.validatorResult = (req,res,next) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if(hasErrors){
        const firstError = result.array()[0].msg;
        return res.status(400).json({
            message: firstError,
        });
    }
    next();
}