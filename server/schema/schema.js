const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;
const _=require('lodash');
var books = [
    {name:'Gone with the wind', genre: 'emotional', id :'1'},
    {name:'Gone with the sand', genre: 'emotional', id :'2'},
    {name:'blood', genre: 'emotional', id :'3'}
]
const BookType = new GraphQLObjectType({
    name:"Book",
    fields:()=>({
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        genre:{type:GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        // this is the name of the query I will make from the frontends
        book : {
            type: BookType,
            args: {id:{type:GraphQLString}},
            resolve (parent,args){
                // code to get data from db/other source
                return _.find(books,{id:args.id})

            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})