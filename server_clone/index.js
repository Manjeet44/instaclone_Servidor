const {ApolloServer} = require('apollo-server-express');
const mongoose = require('mongoose');
const express = require('express');
//const {graphqlUploadExpress} = require('graphql-upload');
const graphqlUploadExpress = require('graphql-upload/graphqlUploadExpress.js');
const typeDefs = require('./gql/schema');
const resolvers = require('./gql/resolvers');
require('dotenv').config({path: '.env'});

mongoose.connect(process.env.BBDD, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, _) => {
    if(err) {
        console.log('Error de conexion');
    } else {
        server();
    }
});
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

async function server() {
    const serverApollo = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground({
              // options
            })
        ],
    });
    await serverApollo.start();
    const app = express();
    app.use(graphqlUploadExpress());
    serverApollo.applyMiddleware({app});
    await new Promise((r) => app.listen({port: process.env.PORT || 4000}, r));
    console.log('################');
    console.log(`Server Ready at http://localhost:4000${serverApollo.graphqlPath}`);
    console.log('################');
}