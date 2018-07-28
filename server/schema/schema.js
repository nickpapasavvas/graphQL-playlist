const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLSchema,
     GraphQLID, GraphQLInt, GraphQLList } = graphql;
const _=require('lodash');
var books = [
    {name:'Gone with the wind', genre: 'emotional', id :'1', authorId:'2'},
    {name:'Gone with the sand', genre: 'emotional', id :'2', authorId:'1'},
    {name:'blood', genre: 'emotional', id :'3', authorId:'3'}
]

var authors = [
    { name:'Nick', age: 45, id:'1'},
    { name:'Bob', age: 45, id:'1'},
    { name:'Mike', age: 45, id:'1'},
]
const BookType = new GraphQLObjectType({
    name:"Book",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                _.find(authors,{id:parent.authorId})

            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return _.filter(books, {authorId:parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        // this is the name of the query I will make from the frontends
        book : {
            type: BookType,
            args: {id:{type:GraphQLID}},
            resolve (parent,args){
                // code to get data from db/other source
                return _.find(books,{id:args.id})

            }
        },
        author : {
            type: AuthorType,
            args: {id:{type:GraphQLID}},
            resolve (parent,args){
                // code to get data from db/other source
                return _.find(authors,{id:args.id})

            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                return authors
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})