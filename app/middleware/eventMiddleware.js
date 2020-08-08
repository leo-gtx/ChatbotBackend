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
        req.body = req.fields;
        if (!req.body) return res.sendStatus(400);
        res.setHeader('Content-Type', 'application/json');
        console.log("Get events from Dialogflow post request handled.");
        var filter = {
            type: 'exam',
            semester: req.body.queryResult.parameters['semester']
        }
        var results = await Event.find(filter, null, { sort: 'date' }, function(err, docs) {
            if (err) {
                res.json(err);
            }
            docs = docs.filter((item) => item.date >= Date.now());
        });
        var response = "";
        if (results) {
            response = "This is the results that i've found: \n ";
            results.forEach((item) => {
                response += item.description + " \n should stand the " + item.date.toDateString();
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

    },
    findScholarEvent: async(req, res) => {
        req.body = req.fields;
        if (!req.body) return res.sendStatus(400);
        res.setHeader('Content-Type', 'application/json');
        console.log("Get events from Dialogflow post request handled.");
        var filter = {
            type: req.body.queryResult.parameters['event'],
            date: req.body.queryResult.parameters['date-period'] || null,
        }
        var results = await Event.find(filter.type, null, { sort: 'wroteAt' }, function(err, docs) {
            if (err) {
                res.json(err);
            }

            if (filter.date) {
                docs = docs.filter((item) => item.date >= filter.date.startDate && item.date <= filter.date.endDate);
            }


        });
        var response = "";
        if (results) {
            response = "This is the results that i've found: \n ";
            results.forEach((item) => {
                response += item.description + " \n - " + item.date.toDateString() + ". \n";
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
module.exports = EventMiddleware;