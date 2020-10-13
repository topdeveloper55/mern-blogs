import { gql } from 'apollo-server-express';

const typeDefs = gql`
    scalar Date;

    type Person {
        name: String!
        posts: [Posts]
    }

    type Posts {
        title: String!
        createdBy: Person
        createdDate: Date
    }
`;

module.exports = typeDefs;
