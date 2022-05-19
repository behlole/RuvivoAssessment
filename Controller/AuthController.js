const {User, createUser, userSchema} = require("../Model/User");
require("dotenv/config");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {json} = require("express");
const response = require("../Utils/Response");

module.exports = {
    signUp: async (req, res) => {


        try {
            req.body.file = req.file.path;

            let userID = await User.findOne({email: req.body.email});
            if (userID) {
                return res.send(response.errorResponse("The user is already registered"));
            }
            let user = createUser(req.body);
            await user.save();
            user = user.toJSON();
            delete user.password;
            const token = jwt.sign(
                {
                    userId: user._id.toString(),
                    email: user.email,
                },
                "my-32-character-ultra-secure-and-ultra-long-secret",
                {expiresIn: "1d"}
            );
            return res.send(response.successResponse({
                token: token,
                user: user
            }, "User registered successfully"));
        } catch (e) {
            return res.send(response.errorResponse(e.message));

        }
    },
    signIn: async (req, res) => {
        try {
            let user = await User.findOne({email: req.body.email});
            if (!user) {
                return res.send(response.errorResponse("No Such User Exists!"));
            }
            if (user && bcrypt.compareSync(req.body.password, user.password)) {
                res.header("x-auth-token", userSchema.methods.generateAuthToken());
            } else {
                return res.send(response.errorResponse("Incorrect Username/Password"));
            }
            user = user.toJSON();
            delete user.password;
            const token = jwt.sign(
                {
                    userId: user.id,
                    email: user.email,
                },
                "my-32-character-ultra-secure-and-ultra-long-secret",
                {expiresIn: "1d"}
            );
            return res.send(response.successResponse({token: token, user: user}, "User logged in successfully."));
        } catch (e) {
            return res.send(response.errorResponse(e.message));

        }
    },

};
