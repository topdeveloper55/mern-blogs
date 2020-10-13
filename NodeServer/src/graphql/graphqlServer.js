const { ApolloServer } = require('apollo-server-express');
const PostsModel = require('../models/Posts');
const UserModel = require('../models/User');
const typeDefs = require('./schema');

async function addnewUser(parent,args){
    const user = new UserModel({
      name: args.name,
      email: args.email,
      password: args.password,
      avatarURL: args.avatarURL,
      posts: []
    });
    const res = await user.save();
    return res; 
}

const resolvers = {
    Query: {
        users: () => null,
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
