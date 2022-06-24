const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const userRoute = require('./routes/userRoutes');
const bookRoute = require('./routes/bookRoutes');
const cartRoute = require('./routes/cartRoutes');

dotenv.config();
mongoose.connect(
    process.env.CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));


const app = express();
app.use(express.json());

app.use(session({ 
    secret: 'Bookstore', 
    resave: true, 
    saveUninitialized: true
}))

app.use(cors());

//router
app.use(userRoute);

app.use(bookRoute);

app.use(cartRoute);



app.use("/", function(req, res){
    res.send("<h1>This is abhi</h1>");
})

app.listen(8080, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Server is running on 8080...");
    }
});