const mongoose = require("mongoose");


const propertySchema = new mongoose.Schema({
  // BASIC INFO
  //-----------------------------------------------
  _id: Number,
 title: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  auther: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  published_date: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
});

const Book =  mongoose.model("book", propertySchema);
module.exports = Book;