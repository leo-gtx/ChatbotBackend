const Activity = require('../model/activityModel');

const ActivityMiddleware = {
    find: async(req, res) => {
        req.body = req.fields;
        if (!req.body) return res.sendStatus(400);
        res.setHeader('Content-Type', 'application/json');
        console.log("Get activity from Dialogflow post request handled.");
        var filter = {
            department: req.query.student.class.department._id
        }
        var results = await Activity.find(filter, null, { sort: 'wroteAt' }, function(err, docs) {
            if (err) {
                res.json(err);
            }
        });
        var response = "";
        if (results && results.length > 0) {
            response = "This is the results that i've found: \n ";
            results.forEach((item) => {
                response += item.description + " - " + item.at.toDateString();
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
module.exports = ActivityMiddleware;