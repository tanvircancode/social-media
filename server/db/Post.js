
const mongoose = require("mongoose");

//defining mongoose scehmas
const postSchema = new mongoose.Schema({
    userId: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    picturePath: String,
    description: String,
    userPicturePath: String,
    likes: {
        type: Map,
        of: Boolean,
    },
    comments: {
        type: Array,
        default: [],
    }
});

const Post = mongoose.model("Post", postSchema);


module.exports = {
    Post
}