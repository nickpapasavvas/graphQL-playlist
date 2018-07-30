const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLSchema,
     GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;
const Book = require("../models/book");
const Author = require("../models/author");
const _=require('lodash');

const BookType = new GraphQLObjectType({
    name:"Book",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
               // _.find(authors,{id:parent.authorId})
               // we search inside the Author collection
               // inside the database each book has also an authorId
               // look the add book mutation
               return Author.findById(parent.authorId)
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
                // return _.filter(books, {authorId:parent.id})
                // we search inside the Book collection
                return Book.find({
                    authorId:parent.id
                })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        // this is the name of the query I will make from the frontend
        book : {
            type: BookType,
            args: {id:{type:GraphQLID}},
            resolve (parent,args){
                // code to get data from db/other source
                // return _.find(books,{id:args.id})
                return Book.findById(args.id)
            }
        },
        author : {
            type: AuthorType,
            args: {id:{type:GraphQLID}},
            resolve (parent,args){
                // code to get data from db/other source
                // return _.find(authors,{id:args.id})
                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                // return books
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                // return authors
                return Book.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                // a new Author object to be put in the mongo collection
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                authorId:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                // a new Book object to be put in the mongo collection
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }

    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})