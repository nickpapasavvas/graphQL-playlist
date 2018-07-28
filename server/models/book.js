const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre:String,
    authorId: String
})
// model===collection, A collection of books (objects) that look like the bookSchema
module.exports = mongoose.model("Book", bookSchema)