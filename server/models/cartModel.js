const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  cartItems: [
    {
        book: { type: mongoose.Schema.Types.ObjectId, ref: 'book', required: true },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true }
    }
]
});

module.exports = cartSchema;
