const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    title: String,
    text: String,
    slug: String,
    author: Object,
    createdDate: { type: Date, default: Date.now },
});

/* Saved in a collection named people  */
const Posts = mongoose.model('post', Post);

module.exports = Posts;
