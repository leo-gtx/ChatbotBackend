const CourseMiddleware = require('../middleware/courseMiddleware');
const EventMiddleware = require('../middleware/eventMiddleware');
const ResultsMiddleware = require('../middleware/resultsMiddleware');
const ExamMiddleware = require('../middleware/examMiddleware');
const ActivityMiddleware = require('../middleware/activityMiddleware');
//const Student = require('../model/studentModel');
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../keys/keys');
var Webhook = function(req, res) {
    //console.log(req.body);
    //get the student by token
    var token;
    var student;
    //console.log(req.session);
    if (req.session.token) {
        token = req.session.token;
        student = jwt.verify(token, SECRET_KEY);
    }


    if (student) {
        //Infer it into the req.query
        req.query.student = student;
        //Call course middleware if the intent is about the course
        if (req.body.queryResult.intent.displayName.toLowerCase().indexOf('course') > -1) {
            CourseMiddleware.find(req, res);
        }
        //Call the Event middleware if the intent is about the event
        if (req.body.queryResult.intent.displayName.toLowerCase().indexOf('event') > -1) {
            if (req.body.queryResult.intent.displayName.toLowerCase().indexOf('exams') > -1) {
                EventMiddleware.findExamEvent(req, res);
            }

            if (req.body.queryResult.intent.displayName.toLowerCase().indexOf('scholar') > -1) {
                EventMiddleware.findScholarEvent(req, res);
            }

        }

        if (req.body.queryResult.intent.displayName.toLowerCase().indexOf('exam') > -1) {
            //Call the results  middleware if the intent is about the results
            if (req.body.queryResult.intent.displayName.toLowerCase().indexOf('results') > -1) {
                ResultsMiddleware.find(req, res);
            }

            //Call the results  middleware if the intent is about the results
            if (req.body.queryResult.intent.displayName.toLowerCase().indexOf('timetable') > -1) {
                ExamMiddleware.find(req, res);
            }

        }

        //Call the activity middleware if the intent is about the activities
        if (req.body.queryResult.intent.displayName.toLowerCase().indexOf('activity') > -1) {
            ActivityMiddleware.find(req, res);
        }

    } else {
        res.json({
            success: false,
            description: 'You cannot access!'
        });
        console.log('You cannot access!');
    }









}

module.exports = Webhook