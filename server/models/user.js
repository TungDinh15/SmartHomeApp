const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Create the register element for user to register and login
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    tokens: [
        { type: Object }
    ]
});

// Hashing the password with Bcrypt package
userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 8, (err, hash) => {
            if (err) return next(err);

            this.password = hash;
            next();
        })
    }
});

// Compare the password
userSchema.methods.comparePassword = async function (password) {
    if (!password) throw new Error('Password is missing, could not compare!');

    try {
        const result = await bcrypt.compare(password, this.password);
        return result;
    } catch (error) {
        console.log('Error while comparing password!', error.message);
    }
};

// Method to ensure that the email will not be duplicated
userSchema.statics.isThisEmailInUse = async function (email) {
    if (!email) throw new Error('Invalid Email')
    try {
        const user = await this.findOne({ email })
        if (user) return false

        return true;
    } catch (error) {
        console.log('Problem with isThisEmailInUse method', error.message)
        return false
    }
};

module.exports = mongoose.model('User', userSchema);