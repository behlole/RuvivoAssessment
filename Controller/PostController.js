const {Post, getPost, postSchema, createPost} = require("../Model/Post");
require("dotenv/config");
const response = require("../Utils/Response");
const {createUser} = require("../Model/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();
module.exports = {
    createPost: async (req, res) => {
        try {
            req.body.file = req.file.path;
            req.body.user_email = req.user_email;
            let post = createPost(req.body);
            await post.save();
            return res.send(response.successResponse(post, "Posts running"));

        } catch (e) {
            return res.send(response.errorResponse(e.message));

        }

    },
    getPosts: async (req, res) => {

        let posts = await getPost(req.user_email, req.query.id);
        return res.send(response.successResponse(posts, "Posts fetched"));
    },

    updatePost: async (req, res) => {
        if (!req.query.id) {
            return res.send(response.errorResponse("Post Id  is required"))
        }
        let single_post = await getPost(req.user_email, req.query.id);
        if (single_post.length > 0) {
            req.body.file = req.file.path;
            console.log(req.file.path);
            req.body.user_email = req.user_email;
            let updated_post = await Post.findOneAndUpdate({_id: req.query.id}, req.body);
            if (updated_post) {
                try {
                    fs.unlinkSync('./' + updated_post.file)
                    //file removed
                } catch (err) {
                    res.send(response.errorResponse(err.message));
                }
                return res.send(response.successResponse(updated_post, "Posts updated successfully"));
            }

            res.send(response.successResponse(single_post, "Post found"))
        } else {
            return res.send(response.errorResponse("Post Not Found"))

        }
    },
    deletePost: async (req, res) => {
        if (!req.query.id) {
            return res.send(response.errorResponse("Post Id  is required"))
        }
        let single_post = await getPost(req.user_email, req.query.id);
        if (single_post.length > 0) {
            let deleted_post = await Post.findOneAndDelete({_id: req.query.id});
            if (deleted_post) {
                try {
                    fs.unlinkSync('./' + updated_post.file)

                    //file removed
                } catch (err) {
                    res.send(response.errorResponse(err.message));
                }
                return res.send(response.successResponse(deleted_post, "Posts deleted successfully"));
            }
            res.send(response.successResponse(single_post, "Post found"))
        } else {
            return res.send(response.errorResponse("Post Not Found"))

        }
    }
};
