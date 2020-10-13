const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    title: String,
    text: String,
    createdBy: { type: String, match: /[A-Z a-z]/ },
    createdDate: { type: Date, default: Date.now },
});

/* Saved in a collection named people  */
const Posts = mongoose.model('Post', Post);

module.exports = Posts;
