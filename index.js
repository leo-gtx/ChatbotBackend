//Import Libraries
var express = require('express'),
    bodyParser = require('body-parser');

//Import custom modules
var chatbotRoute = require('./app/routes/chatbotRoute');
var config = require('./app/config/config');
//Connect to Mongo DB
//mongoose.connect(config.getDBString());
//Create a new Express application and Configure it
var app = express();
//Body parser for parssing request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Configure Routes
app.use(config.API_PATH, chatbotRoute());

//Start the server
app.listen(config.PORT);
console.log('Server started at - ' + config.URL + ":" + config.PORT);