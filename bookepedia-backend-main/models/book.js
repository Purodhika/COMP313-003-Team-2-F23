const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
  },
  authors: {
    type: String,
  },
  genre: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  sellerEmail: {
    type: String,
  },
  image: {
    type: String,
  },
  dateAdded: { type: Date, default: Date.now },
  views: {type: Number, default: 0},
  condition: {
    type: String,
  },
  sold: {type: Number, default: 0}
});

module.exports = mongoose.model("Book", bookSchema);
