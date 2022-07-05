const {register, login, getUser, updateAvatar} = require('../controllers/user');
//const {GraphQLUpload} = require('graphql-upload');
const GraphQLUpload = require('graphql-upload/GraphQLUpload.js');

const resolvers = {
    Upload: GraphQLUpload,
    Query: {
        //Usuario
        getUser: (_,{id, username}) => getUser(id, username),
    },
    Mutation: {
        //Usuario
        register: (_, {input}) => register(input),
        login: (_, {input}) => login(input),
        updateAvatar: (_, {file}) => updateAvatar(file)
    }
};
module.exports = resolvers;