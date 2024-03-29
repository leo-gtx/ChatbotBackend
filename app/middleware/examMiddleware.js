const Exam = require('../model/examModel');

const ExamMiddleware = {
    find: async(req, res) => {
        //req.body = req.fields;
        if (!req.body) return res.sendStatus(400);
        res.setHeader('Content-Type', 'application/json');
        console.log("Get exams from Dialogflow post request handled.");
        var filter = {
            semester: req.body.queryResult.parameters['semester'],
            class: req.query.student.class._id
        }
        var results = await Exam.find(filter, null, { sort: 'wroteAt' }, function(err, docs) {
            if (err) {
                res.json(err);
            }
        });
        var response = "";
        if (results && results.length > 0) {
            response = "This is the timetable for the semester " + filter.semester + ": \n ";
            results.forEach((item) => {
                response += item.description;
                response += " \n ";
            });
        } else {
            response = "There is no result for this query";
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
module.exports = ExamMiddleware;