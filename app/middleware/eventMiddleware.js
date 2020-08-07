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
    find: async(req, res) => {
        req.body = req.fields;
        if (!req.body) return res.sendStatus(400);
        res.setHeader('Content-Type', 'application/json');
        console.log("Get events from Dialogflow post request handled.");
        var filter = {
            type: req.params.type,
            semester: req.fields.queryResult.parameters['semester']
        }
        var results = Event.find(filter, null, { sort: 'date' }, function(err, docs) {
            if (err) {
                res.json(err);
            }
            docs = docs.filter(item => item.date >= Date.now);
        });

        var response = "";
        if (results) {
            response = "This is what i've found: \n";
            results.forEach((item) => {
                response += item.description + "\n for the " + item.date;
            });
        } else {
            response = "I have no result for this query";
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