const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    title: String,
    createdBy: { type: String, match: /[A-Z a-z]/ },
    createdDate: { type: Date, default: Date.now },
});

/* Saved in a collection named people  */
const PostsModel = mongoose.model('Post', Post);

module.exports = PostsModel;
