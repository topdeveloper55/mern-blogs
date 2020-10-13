const { gql } = require('apollo-server-express');

const typeDefs = gql`
    scalar Date

    type User {
        name: String!
        email: String!
        password: String!
        avatarURL: String
        posts: [Posts]
    }

    type Posts {
        title: String!
        text: String
        createdBy: User
        createdDate: Date
    }

    type Query {
        users: [User]
        posts: [Posts]
    }

    type Mutation {
        addUser(
            name: String!
            email: String!
            password: String!
            avatarURL: String
        ): User
    }
`;
module.exports = typeDefs;
