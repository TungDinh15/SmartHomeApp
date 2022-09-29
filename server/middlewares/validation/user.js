const { check, validationResult } = require('express-validator');

// Check all the requirement for signing up accounts
exports.validateUserSignUp = [
    // Check the requirement of full name
    check('fullname')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name is required!')
        .isString()
        .withMessage('Name must be a valid one!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be from 3 to 20 characters!'),

    // Check the requirement of email 
    check('email')
        .normalizeEmail()
        .isEmail()
        .withMessage('Invalid email!'),

    // Check the requirement of password    
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is empty')
        .isLength({ min: 3, max: 20 })
        .withMessage('Password must be from 3 to 20 characters!'),

    // Check the confirmPassword    
    check('confirmPassword')
        .trim()
        .not()
        .isEmpty()
        .custom((value, { req }) => {
            if (value != req.body.password) {
                throw new Error('Both password must be the same!');
            }
            return true;
        })
];

exports.userValidation = (req, res, next) => {
    const result = validationResult(req).array();

    if (!result.length) return next();

    const error = result[0].msg;
    res.json({
        success: false,
        message: error
    });
};

exports.validateUserSignIn = [
    check('email')
        .trim()
        .isEmail()
        .withMessage('Email and Password is required'),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Email and Password is required'),
];