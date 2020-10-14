const { gql } = require('apollo-server-express');

const typeDefs = gql`
    scalar Date
    scalar Object

    type User {
        name: String!
        email: String!
        password: String!
        avatarURL: String
        posts: [Posts]
    }

    type Posts {
        title: String!
        slug: String!
        text: String
        author: User
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
        createPost(title: String!, text: String!, author: Object): Posts
    }
`;
module.exports = typeDefs;
