var Course = require('../model/courseModel');


var CourseMiddleware = {


    findAll: async(req, res) => {
        Course.find().lean().exec((err, doc) => {
            if (err) {
                res.json(err);
            }
            res.json({
                message: 'success',
                description: 'Course retrieved!',
                results: doc
            });
        });
    },
    find: async(req, res) => {
        console.log('Received post request for course');
        //req.body = req.fields;
        if (!req.body) return res.sendStatus(400);
        res.setHeader('Content-Type', 'application/json');
        console.log('Get course from Dialogflow ' + req.body.queryResult.parameters['date-period']);
        var filter = {
            startDate: req.body.queryResult.parameters['date-period'].startDate,
            endDate: req.body.queryResult.parameters['date-period'].endDate,
            class: req.query.student.class._id
        }
        var results = await Course.find({ class: filter.class, date: { $gte: filter.startDate, $lte: filter.endDate } }, null, { sort: '-wroteAt' }, function(err, docs) {

            if (err) {
                res.json(err);
            }

        });

        var response = "";
        if (results && results.length > 0) {
            response += "This is what i've found: \n "
            results.forEach((item) => {
                response += item.description + ".\n";
                response += "This timetable is available for the " + item.date.toDateString()
            });

        } else {
            response = "I have no result for this query";
        }

        const responseObj = {
            fulfillmentText: response,
            fulfillmentMessages: [{
                text: {
                    text: [
                        response
                    ]
                }
            }]
        }
        console.log('This is the response to dialogflow');
        console.log(responseObj);
        return res.json(responseObj);
    }
}
module.exports = CourseMiddleware;