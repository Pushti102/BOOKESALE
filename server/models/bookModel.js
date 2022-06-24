const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Description: {
    type: String,
    required: true,
    trim: true,
  },
  BookPictures: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  offer: { type: Number },
  // createdBy: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "users",
  //   required: true,
  // },
  // quantity: {
  //   type: Number,
  //   required: true,
  // },
});

module.exports = bookSchema;
