var mongoose = require("mongoose");
const cartSchema = require("../models/cartModel");

// cart schema
const cartDataCollection = mongoose.model("cart", cartSchema);

console.log("cart Controller is called");

exports.addItemToCart = (req, res) => {
  cartSchema.findone({ user: req.user._id }).exec((error, cart) => {
    if (error) return res.status(400).json({ error });
    if (cart) {
      //if cart already exists then update cart by quantity
      let promiseArray = [];

      req.body.cartItems.forEach((cartItems) => {
        const book = cartItem.book;
        const item = cart.cartItems.find((c) => c.book == book);
        let condition, update;
        if (item) {
          condition = { user: req.user._id, "cartItems.book": book };
          update = {
            $set: {
              "cartItems.$": cartItem,
            },
          };
        } else {
          condition = { user: req.user._id };
          update = {
            $push: {
              cartItems: cartItem,
            },
          };
        }
        promiseArray.push(runUpdate(condition, update));
      });
      Promise.all(promiseArray)
        .then((response) => res.status(201).json({ response }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      //if cart not exist then create a new cart
      const cart = new Cart({
        user: req.user._id,
        cartItems: req.body.cartItems,
      });
      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          return res.status(201).json({ cart });
        }
      });
    }
  });
};

exports.getCartItems = (req, res) => {
  //const { user } = req.body.payload;
  //if(user){
  Cart.findOne({ user: req.user._id })
    .populate("cartItems.book", "_id name price bookPictures")
    .exec((error, cart) => {
      if (error) return res.status(400).json({ error });
      if (cart) {
        let cartItems = {};
        cart.cartItems.forEach((item, index) => {
          cartItems[item.book._id.toString()] = {
            _id: item.book._id.toString(),
            name: item.book.Name,
            img: item.book.BookPictures[0].img,
            price: item.book.Price,
          };
        });
        res.status(200).json({ cartItems });
      }
    });
  //}
};

// new update remove cart items
exports.removeCartItems = (req, res) => {
  const { bookId } = req.body.payload;
  if (bookId) {
    Cart.update(
      { user: req.user._id },
      {
        $pull: {
          cartItems: {
            book: bookId,
          },
        },
      }
    ).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  }
};