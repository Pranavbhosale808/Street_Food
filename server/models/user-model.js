const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});
// Hashing a Password
userSchema.pre('save', async function (next) {
    const user = this;
    console.log(user.isModified('password'));

    if (!user.isModified('password')) {
        next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, salt);
        user.password = hash_password;
        console.log(hash_password);
    } catch (error) {
        next(error);

    }
})

// Creating a JWT token
const key = process.env.JWT_KEY
userSchema.methods.generateToken = async function () {
    try {

        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin,
            },
            "thibjbwebf",
            {
                expiresIn: "30d",
            }
        );

    } catch (error) {
        console.log("Generate Web token error : \n", error);
    }
}
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.error("Error comparing passwords:", error);
        return false;
    }
};
const User = mongoose.model('User', userSchema);

module.exports = User;