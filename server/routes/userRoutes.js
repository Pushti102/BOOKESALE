const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();


console.log("User Router called");


router.post('/loginUser', userController.loginUser);
router.get('/getUser',userController.getUsers);
router.post('/registerUser',userController.addUser);
router.get('/authentication',userController.getUserDataByToken);
router.get('/getUserDataById',userController.getUserById);
router.patch('updateUser',userController.updateUser);
router.delete('delete',userController.removeUserById);

module.exports = router;