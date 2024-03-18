const { Schema } = require('mongoose');

const bookSchema = new Schema({
  authors: [
    {
      type: String,
    },
  ],
  bookId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
  },
  genre: {
    type: String,
  },
});

module.exports = bookSchema;
