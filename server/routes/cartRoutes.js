const express = require("express");
const cartController = require("../controllers/cartController");

const router = express.Router();

console.log("Cart Router is called");

router.post("/addtocart", cartController.addItemToCart);
router.post("/getCartItems", cartController.getCartItems);
router.post("/removeItem", cartController.removeCartItems);

module.exports = router;
