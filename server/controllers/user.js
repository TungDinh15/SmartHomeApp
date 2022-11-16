const User = require('../models/user');
const jwt = require('jsonwebtoken');
const sharp = require('sharp');
const cloudinary = require('../helper/imageUpload');

// Send and save data to MongoDB
exports.createUser = async (req, res) => {

    const { fullname, email, password } = req.body;

    // Make sure that there would not have duplicated email sign-up
    const isNewUser = await User.isThisEmailInUse(email);

    if (!isNewUser)
        return res.json({
            success: false,
            message: 'This email is already in use, please try another one',
        });

    const user = await User({
        fullname,
        email,
        password,
    })

    await user.save();
    res.json({success: true, user});
};

exports.userSignIn = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
        return res.json({
            success: false,
            message: 'User not found, with the given email!',
        });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
        return res.json({
            success: false,
            message: 'Email / password does not match!',
        });

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET, { expiresIn: '1d' }
    );

    const userInfo = {
        fullname: user.fullname,
        email: user.email,
        avatar: user.avatar ? user.avatar : '',
    }

    // Respond data to the frontend
    res.json({ success: true, user: userInfo, token })
};

exports.uploadProfile = async (req, res) => {
    const { user } = req
    if (!user)
        return res
            .status(401)
            .json({ success: false, message: 'Unauthorized access!' });

    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            public_id: `${user._id}_profile`,
            width: 500,
            height: 500,
            crop: 'fill'
        });

        await User.findByIdAndUpdate(user._id, { avatar: result.url });
        res.status(201).json({ success: true, message: 'Your Profile is updated!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error from server. try again!' });
        console.log('Error while uploading profile image', error.message);
    }
};