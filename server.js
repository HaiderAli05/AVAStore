const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5001;
const cors = require('cors');
// const morgan = require('morgan');
require('dotenv').config();
//Connection with Database
require(path.join(__dirname, './db/conn'));
//Import Routes
const userRoutes = require(path.join(__dirname, './api/routes/user'));
const privateRoutes = require(path.join(__dirname, './api/routes/privateRoute'));
const productRoutes = require(path.join(__dirname, './api/routes/productRoute'));


//MiddleWares
app.use(express.json());
app.use(cors());
// app.use(morgan('dev'));
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'front-end/build')));
app.use('/api/user', userRoutes);
app.use('/api/privatepage', privateRoutes);
app.use('/api/products', productRoutes);


// GET request for Main Index page
app.get('/', (req, res)=>{
    res.send('<h1>There may be some technical problem with Website.</h1>');
});

//Heroku production code
if(process.env.NODE_ENV == "production"){
  app.use(express.static("front-end/build"));
  const path = require("path");
  app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname,'front-end','build','index.html'));
  })
}

app.listen(port, ()=>{
    console.log(`Connected with Server at ${port}`);
})