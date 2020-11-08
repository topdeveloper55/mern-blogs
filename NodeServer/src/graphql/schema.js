const { gql } = require('apollo-server-express');

const typeDefs = gql`
	scalar Object

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
		checkExisting(userName: String!, email: String!): Object
		userLogin(email: String!, password: String!): Object
	}

	type Mutation {
		addUser(
			name: String!
			userName: String!
			email: String!
			password: String!
			avatarURL: String
		): User

		createPost(title: String!, text: String!, authorEmail: String): Posts
		deletePost(id: String!): String
	}
`;
module.exports = typeDefs;
