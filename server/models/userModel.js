const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Seller", "Buyer"], //enum
    required: true,
  },
  // cartbook: [
  //   {
  //     bookid: {type: mongoose.Schema.Types.ObjectId, ref:'book', review: String},
  //   }
  // ]
});

module.exports = usersSchema;
