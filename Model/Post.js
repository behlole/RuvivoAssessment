const mongoose = require("mongoose");


let postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
    },
    description: {
        type: String,
        required: true,
        maxLength: 200,
    },
    file: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true,
    }
});
exports.Post = new mongoose.model("Post", postSchema);
exports.postSchema = postSchema;

exports.createPost = (post) => {
    return this.Post({
        title: post.title,
        description: post.description,
        file: post.file,
        user_email: post.user_email
    });
};
exports.getPost = async (email, id = null) => {
    if (id)
        return this.Post.find({user_email: email, _id: id});
    else
        return this.Post.find({user_email: email});

};
