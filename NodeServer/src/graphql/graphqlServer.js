const { ApolloServer } = require('apollo-server-express');
const Posts = require('../models/Posts');
const Users = require('../models/User');
const typeDefs = require('./schema');
const slugify = require('slugify');
const moment = require('moment');

function slugifyText(str) {
    return slugify(str, {
        replacement: '-',
        lower: true,
    });
}

async function checkExisting(parent, args) {
    const emailExists = await Users.findOne({ email: args.email });
    if (emailExists) {
        return true;
    }
    const unameExists = await Users.findOne({ userName: args.userName });
    if (unameExists) {
        return true;
    }
    return false;
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
        checkExisting: async (parent, args) =>
            await checkExisting(parent, args),
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
