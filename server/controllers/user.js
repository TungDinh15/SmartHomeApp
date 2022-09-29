const User = require('../models/user');
const jwt = require('jsonwebtoken');

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

    await user.save(user);
    res.json(user);
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
    )

    // Respond data to the frontend
    res.json({ success: true, user, token })
};
