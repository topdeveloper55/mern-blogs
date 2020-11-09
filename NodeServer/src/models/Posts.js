const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
	title: String,
	text: String,
	slug: String,
	author: Object,
	createdDate: String,
});

/* Saved in a collection named people  */
const Posts = mongoose.model('post', Post);

module.exports = Posts;

/*	You can use nanoid to generate unique IDs for posts or even objext keys for react, 
	instead of using ObjectId.
	https://www.npmjs.com/package/nanoid
	
	For mongoose - 
		const mySchema = new Schema({
  			_id: {
    			type: String,
    			default: () => nanoid()
  			}
		})
*/ 