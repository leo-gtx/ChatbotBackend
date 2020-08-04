const CourseMiddleware = require('../middleware/courseMiddleware');

var Webhook = function(req, res) {
    if (req.body.intent.displayName.toLowerCase().indexOf('course') > -1) {
        CourseMiddleware.find();
    }
}

module.exports = Webhook