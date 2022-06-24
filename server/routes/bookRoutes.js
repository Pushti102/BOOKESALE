const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();

console.log("Book Router called");

router.get("/bookdetails", bookController.getAllBookDetails);
router.post("/addbook", bookController.addBook);
router.post("/getBookById", bookController.getBookById);
router.post("/updateBook", bookController.updateBook);
router.post("/removeBook", bookController.removeBook);

module.exports = router;
