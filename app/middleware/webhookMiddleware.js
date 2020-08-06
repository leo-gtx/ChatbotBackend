const CourseMiddleware = require('../middleware/courseMiddleware');

var Webhook = function(req, res) {
    if (req.fields.queryResult.intent.displayName.toLowerCase().indexOf('course') > -1) {
        //console.log(req.fields);
        CourseMiddleware.find(req, res);
    }
}

module.exports = Webhook