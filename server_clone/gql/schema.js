const {gql} = require('apollo-server-express');

const typeDefs = gql`
    scalar Upload
    type User {
        id: ID
        name: String
        username: String
        email: String
        siteWeb: String
        description: String
        avatar: String
        password: String
        createAt: String
    }

    type UpdateAvatar {
        status: Boolean,
        urlAvatar: String
    }

    type Token {
        token: String
    }

    #inputs
    input UserInput {
        name: String!
        username: String!
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type Query {
        # User
        getUser(id: ID, username: String) : User

    }

    type Mutation {
        # User
        register(input: UserInput) : User
        login(input: LoginInput) : Token
        updateAvatar(file: Upload!): UpdateAvatar
    }
`;

module.exports = typeDefs;