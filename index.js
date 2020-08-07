//Import Libraries
var express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    mongoose = require('mongoose');

//Import plugin
const formidableMiddleware = require('express-formidable');
const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('admin-bro-expressjs')
    //Import model
const User = require('./app/model/userModel');
const Department = require('./app/model/departmentModel');
const Student = require('./app/model/studentModel');
const Course = require('./app/model/courseModel');
const Activity = require('./app/model/activityModel');
const University = require('./app/model/universityModel');
const Exam = require('./app/model/examModel');
const Results = require('./app/model/resultsModel');
const StudentInfo = require('./app/model/studentInfoModel');
const Event = require('./app/model/eventModel');

//Import custom modules
var chatbotRoutes = require('./app/routes/chatbotRoutes');
var universityRoutes = require('./app/routes/universityRoutes');
var departmentRoutes = require('./app/routes/departmentRoutes');
var studentRoutes = require('./app/routes/studentRoutes');
var userRoutes = require('./app/routes/userRoutes');
var courseRoutes = require('./app/routes/courseRoutes');
var eventRoutes = require('./app/routes/eventRoutes');
var config = require('./app/config/config');
//var formageService = require('./app/services/formageService');
//Connect to Mongo DB
//mongoose.connect(config.getDBString());
// We have to tell AdminBro that we will manage mongoose resources with it
AdminBro.registerAdapter(require('admin-bro-mongoose'))
    //Create a new Express application and Configure it
var app = express();
app.use(formidableMiddleware());
//Body parser for parssing request
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
//Configure Routes
app.use(config.API_PATH, chatbotRoutes());
app.use(config.API_PATH, universityRoutes());
app.use(config.API_PATH, departmentRoutes());
app.use(config.API_PATH, studentRoutes());
app.use(config.API_PATH, userRoutes());
app.use(config.API_PATH, courseRoutes());
app.use(config.API_PATH, eventRoutes());

//AdminBro configuration
// Pass all configuration settings to AdminBro
const adminBro = new AdminBro({
        resources: [User, Department, Student, Course, Activity, University, Exam, Results, StudentInfo, Event],
        rootPath: '/admin',
    })
    // Build and use a router which will handle all AdminBro routes
const router = AdminBroExpressjs.buildRouter(adminBro)
app.use(adminBro.options.rootPath, router)
    // Running the server
const run = async() => {
    //Connect to Mongo DB
    await mongoose.connect(config.getDBString(), { useNewUrlParser: true })
        //Launch the server
    app.listen(config.PORT);
    console.log('Server started at - ' + config.URL + ":" + config.PORT);
}

run()