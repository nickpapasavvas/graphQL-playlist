const express = require('express');
const graphqlHTTP = require('express-graphql');
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const schema = require('./schema/schema');

const app = express();

// allow cross-origin requests
app.use(cors())

const username = process.env.username;
const password = process.env.password;

mongoose.connect(`mongodb://${username}:${password}@ds257851.mlab.com:57851/gql-ninja`, { useNewUrlParser: true });
mongoose.connection.once('open', ()=>{
    console.log('connected to the database');    
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(4000, ()=>{console.log('now listening for requests on port 4000');
});