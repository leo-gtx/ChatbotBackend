const Exam = require('../model/examModel');

const ExamMiddleware = {
    find: async(req, res) => {
        req.body = req.fields;
        if (!req.body) return res.sendStatus(400);
        res.setHeader('Content-Type', 'application/json');
        console.log("Get exams from Dialogflow post request handled.");
        var filter = {
            semester: req.body.queryResult.parameters['semester']
        }
        var results = await Exam.find(filter.semester, null, { sort: 'wroteAt' }, function(err, docs) {
            if (err) {
                res.json(err);
            }
        });
        var response = "";
        if (results) {
            response = "This is the timetable for semester $semester: \n ";
            results.forEach((item) => {
                response += item.description;
                response += " \n ";
            });
        } else {
            response = "There is no result for this query";
        }

        const responseObj = {
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