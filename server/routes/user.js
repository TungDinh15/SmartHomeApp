const express = require('express');

const router = express.Router();

const { createUser, userSignIn, uploadProfile } = require('../controllers/user');

const {
    validateUserSignUp,
    userValidation,
    validateUserSignIn
} = require('../middlewares/validation/user');

const { isAuth } = require('../middlewares/auth');

const User = require('../models/user');

// Initialize the multer for Upload Image
const multer = require('multer');

const fileFilter = (eeq, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb('invalid image file!', false);
    }
};

const storage = multer.diskStorage({})

const uploads = multer({ storage, fileFilter });


// Setup the Routers
router.post('/create-user', validateUserSignUp, userValidation, createUser);

router.post('/sign-in', validateUserSignIn, userValidation, userSignIn);

router.post(
    '/upload-profile',
    isAuth,
    uploads.single('profile'),
    uploadProfile
);

// router.post('/create-post', isAuth, (req, res) => {
//     // Create our post
//     res.send('You are in Secret route');
// });

module.exports = router;