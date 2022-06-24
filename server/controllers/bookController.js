var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bookSchema = require("../models/bookModel");

// book schema
const bookDataCollection = mongoose.model("book", bookSchema, "book");

console.log("Book Controller called");

// Get all book details
exports.getAllBookDetails = async (req, res, next) => {
  let book = await bookDataCollection.find({});
  res.send(book);
};

// To add book
exports.addBook = (req, res, next) => {
  let bookObj;
  bookObj = new bookDataCollection({
    Name: req.body.Name,
    Price: req.body.Price,
    Description: req.body.Description,
    BookPictures: req.body.BookPictures,
    Category: req.body.Category,
  });

  bookObj.save(function (err, user) {
    if (err) {
      console.log(err.message);
      res.send(err);
    } else {
      res.send(user);
    }
  });
};

//Get book by Id
exports.getBookById = (req, res, next) => {
  let _id = req.body.bookId;
  bookDataCollection.findById(_id, function (err, user) {
    if (err) console.log(err.message);
    res.status(200).json({
      user: user,
    });
  });
};

// update book details by Name
exports.updateBook = async (req, res, next) => {
  let Name = req.body.Name;
  let updateData = {
    Name: req.body.Name,
    Price: req.body.Price,
    Description: req.body.Description,
    BookPictures: req.body.BookPictures,
    Category: req.body.Category,
  };
  await bookDataCollection.findOneAndUpdate(
    Name,
    updateData,
    function (err, user) {
      if (err) console.log(err.message);
      res.status(200).json({
        user: user,
      });
    }
  );
};

// remove book details from database
exports.removeBook = (req, res, next) => {
  let Name = mongoose.Types.Name(req.body.Name);
  bookDataCollection.remove(Name);
};
