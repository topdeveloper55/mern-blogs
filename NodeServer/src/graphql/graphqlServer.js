const { ApolloServer } = require('apollo-server-express');
const Posts = require('../models/Posts');
const Users = require('../models/User');
const typeDefs = require('./schema');

async function addnewUser(parent, args) {
    const user = new Users({
        name: args.name,
        email: args.email,
        password: args.password,
        avatarURL: args.avatarURL,
        posts: [],
    });
    const res = await user.save();
    return res;
}

const resolvers = {
    Query: {
        users: async () => await Users.find(),
        posts: async () => await Posts.find(),
    },
    Mutation: {
        addUser: (parent, args) => addnewUser(parent, args),
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
