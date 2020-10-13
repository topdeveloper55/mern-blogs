const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./schema');

const resolvers = {
    Query: {
        books: () => books,
        restaurants: () => getRestaurants(),
    },
    Mutation: {
        addPerson: (parent, args) => addPerson(parent, args),
        changeRestaurantData: (parent, args) =>
            changeRestaurantData(parent, args),
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
