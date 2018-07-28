const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    age:Number
})
// model===collection, A collection of books (objects) that look like the bookSchema
module.exports = mongoose.model("Author",authorSchema)