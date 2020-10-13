const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: { type: String, match: /[A-Z a-z]/ },
    email: String,
    password: String,
    avatarURL: { type: String, default: ''},
    posts: Object,
});

/* Saved in a collection named people  */
const UserModel = mongoose.model('User', User);

module.exports = UserModel;
