const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
    },
    email: {
        type: String,
        required: true,
        maxLength: 25,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
    },
    file: {
        type: String,
        required: true
    }
});
exports.User = new mongoose.model("User", userSchema);
exports.userSchema = userSchema;

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {_id: this._id, email: this.email},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    );
    return token;
};

exports.createUser = (user) => {
    return this.User({
        name: user.name,
        email: user.email,
        file: user.file,
        password: bcrypt.hashSync(user.password, 10),
    });
};
exports.getUser = (email) => {
    return this.User.findOne({email: email}).exec();
};
