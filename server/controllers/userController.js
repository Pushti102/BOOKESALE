const jwt = require('jsonwebtoken');
var mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const userSchema = require('../models/userModel');

dotenv.config();

console.log("User Controller Called");

// user schema
const userDataCollection = mongoose.model('user', userSchema, 'users');

// Get all users
exports.getUsers = async (req,res,next) => {
    let users = await userDataCollection.find({});
    res.send(users);
}

exports.api = async () => {
    console.log("API");
}

//Login API
exports.loginUser = async (req,res,next) => {
    console.log("Login api called");
    let email = req.body.email;
    let password = req.body.password;
    let user = await userDataCollection.findOne({'email':email});


    if(user){
        console.log("User if loop Enter");
        if(user){
            bcrypt.compare(password,user.password, (error,same) =>{
                if(same){
                    const userData = {
                        userID: user._id,
                        email:user.email,
                        role:user.role,
                        password:user.password 
                    }
                    const token = jwt.sign(userData, process.env.SECRET,{ algorithm:'RS512', expiresIn: '1d'});
                    req.session.token = token;
                    return res.status(200).json({token:token});
                }
                else{
                    res.status(400).json({message: "Email or Password does not match"});
                }
            })
        }
    }
    else{
        res.status(404).json({ message: "User not found ! Register yourself first.."});
    }
}

// To register user
exports.addUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (error, encrypted) => {
        let userObj;

        if (error) {
            res.send(error);
        }
        else {
            userObj = new userDataCollection({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: encrypted,
                role: req.body.role,
            });

            userObj.save(function (err, user) {
                if (err) {
                    console.log(err.message);
                    res.send(err);
                }
                else {
                    res.send(user)
                }
            });
        }
    });
}

//UpdateUser 
exports.updateUser = async (req, res, next) => {
    let id = req.body.userId;
    let updateData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    }
    await userDataCollection.findByIdAndUpdate(id, updateData, function (err, user) {
        if (err) console.log(err.message);
        res.send(user);
    }).clone();

};

//User DatabyToken
exports.getUserDataByToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
        const decode = jwt.verify(token, process.env.PUBLICKEY);
        res.json({
            login: true,
            data: decode
        })
    } else {
        res.json({
            login: false,
            data: "Invalid Token"
        })
    }
}

//Get user using id
exports.getUserById = (req, res, next) => {
    let id = mongoose.Types.ObjectId(req.body.userId);
    userDataCollection.findById(id, function (err, user) {
        if (err) console.log(err.message);
        res.status(200).json({
            user: user
        })
    })
}


// remove user detail from database
exports.removeUserById = (req, res, next) => {
    let id = mongoose.Types.ObjectId(req.body.userId);
    userDataCollection.remove(id);
}