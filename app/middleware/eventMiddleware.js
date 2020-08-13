var Event = require('../model/eventModel');
var EventMiddleware = {

    findAll: async(req, res) => {
        Event.find().lean().exec((err, doc) => {
            if (err) {
                res.json(err);
            }
            res.json({
                message: 'success',
                description: 'Event retrieved!',
                results: doc
            });
        });
    },
    findExamEvent: async(req, res) => {
        //req.body = req.fields;
        if (!req.body) return res.sendStatus(400);
        res.setHeader('Content-Type', 'application/json');
        console.log("Get events from Dialogflow post request handled.");
        var filter = {
            type: 'exam',
            semester: req.body.queryResult.parameters['semester'],
            department: req.query.student.class.department._id
                //date: { $gte: new Date(Date.now()) }
        }
        var results = await Event.find(filter, null, { sort: 'date' }, function(err, docs) {
            if (err) {
                res.json(err);
            }
        });
        var response = "";
        if (results && results.length() > 0) {
            response = "This is the results that i've found: \n ";
            results.forEach((item) => {
                response += item.description + " \n should stand the " + item.date.toDateString();
                response += " \n";
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

    },
    findScholarEvent: async(req, res) => {
        //req.body = req.fields;
        if (!req.body) return res.sendStatus(400);
        res.setHeader('Content-Type', 'application/json');
        console.log("Get events from Dialogflow post request handled.");
        var filter = {
            type: req.body.queryResult.parameters['event'],
            department: req.query.student.class.department._id
        }
        if (req.body.queryResult.parameters['date-period']) {
            filter.date = { $gte: req.body.queryResult.parameters['date-period'].startDate, $lte: req.body.queryResult.parameters['date-period'].endDate };
        }
        var results = await Event.find(filter, null, { sort: 'wroteAt' }, function(err, docs) {
            if (err) {
                res.json(err);
            }

        });
        var response = "";
        if (results && results.length > 0) {
            response = "This is the results that i've found: \n ";
            results.forEach((item) => {
                response += item.date.toDateString() + " : " + item.description + " \n ";
            });
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
module.exports = EventMiddleware;