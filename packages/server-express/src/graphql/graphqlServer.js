const { ApolloServer } = require('apollo-server-express');
const Posts = require('@sdblog/entity/Posts');
const Users = require('@sdblog/entity/User');
const typeDefs = require('./schema');
const slugify = require('slugify');
const moment = require('moment');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function slugifyText(str) {
	return slugify(str, {
		replacement: '-',
		lower: true,
	});
}

async function checkUserExists(uemail) {
	const userExists = await Users.findOne({ email: uemail });
	return userExists;
}

async function checkUNameExists(uName) {
	const userExists = await Users.findOne({ userName: uName });
	return userExists;
}

async function checkExisting(parent, args) {
	const emailExists = await checkUserExists(args.email);

	if (emailExists) {
		return {
			status: 400,
			message: 'This email Id is already registered!',
			data: {},
		};
	}

	const unameExists = await checkUNameExists(args.userName);
	if (unameExists) {
		return {
			status: 400,
			message: 'This username is already taken',
			data: {},
		};
	}
	return { status: 200, message: 'User can be registered!', data: {} };
}

async function addnewUser(parent, args) {
	const user = new Users({
		name: args.name,
		userName: args.userName,
		email: args.email,
		password: args.password,
		avatarURL: args.avatarURL,
		posts: [],
	});
	const res = await user.save();
	return res;
}

async function userLogin(parent, args) {
	const user = await checkUserExists(args.email);

	if (!user) {
		return {
			status: 404,
			message: 'User Not Found!',
			data: {},
		};
	}

	const pswdMatch = await bcryptjs.compare(args.password, user.password);
	if (pswdMatch) {
		const token = await jwt.sign(
			{ exp: Math.floor(Date.now() / 1000) + 60 * 60, data: user },
			process.env.JWT_SECRET
		);
		return {
			status: 200,
			message: 'User Found!',
			data: { result: user, accessToken: token },
		};
	} else {
		return {
			status: 401,
			message: 'Wrong Password!',
			data: {},
		};
	}
}

async function newPost(parent, args) {
	const sluged = slugifyText(args.title);
	const date = moment(new Date()).format('ll');
	const Author = await Users.findOne({ email: args.authorEmail });

	const post = new Posts({
		title: args.title,
		text: args.text,
		slug: sluged,
		author: Author,
		createdDate: date,
	});
	const res = await post.save();
	return res;
}

async function deletePost(parent, args) {
	await Posts.findByIdAndRemove(args.id);
	return null;
}

const resolvers = {
	Query: {
		users: async () => await Users.find(),
		posts: async () => await Posts.find(),
		checkExisting: (parent, args) => checkExisting(parent, args),
		userLogin: (parent, args) => userLogin(parent, args),
	},
	Mutation: {
		addUser: (parent, args) => addnewUser(parent, args),
		createPost: (parent, args) => newPost(parent, args),
		deletePost: (parent, args) => deletePost(parent, args),
	},
};

const gqlServer = new ApolloServer({
	typeDefs,
	resolvers,
	playground: {
		endpoint: '/graphql', // opens gql playground at this route
		settings: {
			'editor.theme': 'dark',
		},
	},
});

module.exports = gqlServer;
