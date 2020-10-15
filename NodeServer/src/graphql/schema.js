const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        name: String!
        userName: String!
        email: String!
        password: String!
        avatarURL: String
        posts: [Posts]
        _id: ID
    }

    type Posts {
        title: String!
        slug: String!
        text: String
        author: User
        createdDate: String
        _id: ID
    }

    type Query {
        users: [User]
        posts: [Posts]
    }

    type Mutation {
        addUser(
            name: String!
            userName: String!
            email: String!
            password: String!
            avatarURL: String
        ): User

        createPost(title: String!, text: String!, author: String): Posts
        deletePost(id: String!): Int
    }
`;
module.exports = typeDefs;
