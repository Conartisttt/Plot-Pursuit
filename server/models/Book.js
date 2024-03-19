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
    unique: true,
  },
  image: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  pages: {
    type: String,
  },
  isRead: {
    type: Boolean,
    default: false
  },
  isReading: {
    type: Boolean,
    default: false
  }
});

module.exports = bookSchema;
