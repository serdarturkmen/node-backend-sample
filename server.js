const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require('./api/routes/user');
const sendEmailRoutes = require('./api/routes/sendemail');
const csvRoutes = require('./api/routes/csvfiles');
const messageRoutes = require('./api/routes/message');


const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/sample?retryWrites=true';
const imagePath = process.env.IMAGE_PATH || 'uploads/';
const http = require('http');
const _ = require('lodash')

const server = http.createServer(app)
const io = require('socket.io')(server)


const port = process.env.PORT || 3000;
console.log(`Your port is ${port}`);


const {
    User
} = require('./api/helpers/UserClass')

mongoose.connect(
    mongoUrl,
    {
        useNewUrlParser: true
    }
);

console.log(mongoUrl);

mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use('/uploads', express.static(imagePath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// Routes which should handle requests
app.use("/products", productRoutes);
app.use("/csv", csvRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);
app.use("/email", sendEmailRoutes);
app.use("/messages", messageRoutes);


app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

require('./api/socket/streams')(io, User, _)
require('./api/socket/chat')(io)
server.listen(port);

module.exports = app;
