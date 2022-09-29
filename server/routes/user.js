const express = require('express');

const router = express.Router();

const { createUser, userSignIn } = require('../controllers/user');

const {
    validateUserSignUp,
    userValidation,
    validateUserSignIn
} = require('../middlewares/validation/user');

const { isAuth } = require('../middlewares/auth');

const User = require('../models/user');

// Initialize the multer for Upload Image
const multer = require('multer');
const sharp = require('sharp');

const fileFilter = (eeq, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb('invalid image file!', false);
    }
};

const storage = multer.memoryStorage();

const uploads = multer({ storage, fileFilter });


// Setup the Routers
router.post('/create-user', validateUserSignUp, userValidation, createUser);

router.post('/sign-in', validateUserSignIn, userValidation, userSignIn);

router.post('/upload-profile', isAuth, uploads.single('profile'), async (req, res) => {
    const { user } = req
    if (!user)
        return res
            .status(401)
            .json({ success: false, message: 'Unauthorized access!' });

    try {
        const profileBuffer = req.file.buffer
        const { width, height } = await sharp(profileBuffer).metadata()
        const avatar = await sharp(profileBuffer)
            .resize(Math.round(width * 0.5), Math.round(height * 0.5))
            .toBuffer()

        await User.findByIdAndUpdate(user._id, { avatar });
        res.status(201).json({ success: true, message: 'Your Profile is updated!'});
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error from server. try again!'});
        console.log('Error while uploading profile image', error.message);
    }
});

// router.post('/create-post', isAuth, (req, res) => {
//     // Create our post
//     res.send('You are in Secret route');
// });

module.exports = router;