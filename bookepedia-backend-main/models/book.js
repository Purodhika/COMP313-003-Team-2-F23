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
  latitude: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => value >= -90 && value <= 90, // Latitude range validation
      message: "Latitude must be between -90 and 90",
    },
  },
  longitude: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => value >= -180 && value <= 180, // Longitude range validation
      message: "Longitude must be between -180 and 180",
    },
  },
  
  sold: {type: Number, default: 0}
});

module.exports = mongoose.model("Book", bookSchema);
