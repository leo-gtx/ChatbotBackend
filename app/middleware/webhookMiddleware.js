const CourseMiddleware = require('../middleware/courseMiddleware');
const EventMiddleware = require('../middleware/eventMiddleware');

var Webhook = function(req, res) {

    if (req.fields.queryResult.intent.displayName.toLowerCase().indexOf('course') > -1) {
        //console.log(req.fields);
        CourseMiddleware.find(req, res);
    }

    if (req.fields.queryResult.intent.displayName.toLowerCase().indexOf('event') > -1) {
        if (req.fields.queryResult.intent.displayName.toLowerCase().indexOf('exams') > -1) {
            req.params = { type: 'exam' };
            EventMiddleware.find(req, res);
        }
    }
}

module.exports = Webhook