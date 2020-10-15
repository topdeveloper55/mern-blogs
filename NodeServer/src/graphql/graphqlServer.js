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

    const post = new Posts({
        title: args.title,
        text: args.text,
        slug: sluged,
        author: args.author,
        createdDate: date,
    });
    console.log(post);
    const res = await post.save();
    return res;
}

const resolvers = {
    Query: {
        users: async () => await Users.find(),
        posts: async () => await Posts.find(),
    },
    Mutation: {
        addUser: (parent, args) => addnewUser(parent, args),
        createPost: (parent, args) => newPost(parent, args),
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
