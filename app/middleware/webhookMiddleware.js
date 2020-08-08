const CourseMiddleware = require('../middleware/courseMiddleware');
const EventMiddleware = require('../middleware/eventMiddleware');
const ResultsMiddleware = require('../middleware/resultsMiddleware');
const ExamMiddleware = require('../middleware/examMiddleware');
const ActivityMiddleware = require('../middleware/activityMiddleware');

var Webhook = function(req, res) {
    //Call course middleware if the intent is about the course
    if (req.fields.queryResult.intent.displayName.toLowerCase().indexOf('course') > -1) {
        CourseMiddleware.find(req, res);
    }
    //Call the Event middleware if the intent is about the event
    if (req.fields.queryResult.intent.displayName.toLowerCase().indexOf('event') > -1) {
        if (req.fields.queryResult.intent.displayName.toLowerCase().indexOf('exams') > -1) {
            EventMiddleware.findExamEvent(req, res);
        }

        if (req.fields.queryResult.intent.displayName.toLowerCase().indexOf('scholar') > -1) {
            EventMiddleware.findScholarEvent(req, res);
        }

    }

    if (req.fields.queryResult.intent.displayName.toLowerCase().indexOf('exam') > -1) {
        //Call the results  middleware if the intent is about the results
        if (req.fields.queryResult.intent.displayName.toLowerCase().indexOf('results') > -1) {
            ResultsMiddleware.find(req, res);
        }

        //Call the results  middleware if the intent is about the results
        if (req.fields.queryResult.intent.displayName.toLowerCase().indexOf('timetable') > -1) {
            ExamMiddleware.find(req, res);
        }

    }

    //Call the activity middleware if the intent is about the activities
    if (req.fields.queryResult.intent.displayName.toLowerCase().indexOf('activity') > -1) {
        ActivityMiddleware.find(req, res);
    }





}

module.exports = Webhook