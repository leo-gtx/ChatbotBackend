const Results = require('../model/resultsModel');

const ResultsMiddleware = {
    find: async(req, res) => {
        //req.body = req.fields;
        if (!req.body) return res.sendStatus(400);
        res.setHeader('Content-Type', 'application/json');
        console.log("Get results from Dialogflow post request handled.");
        var filter = {
            semester: req.body.queryResult.parameters['semester'],
            //date: { $gte: Date.now() }
        }
        var results = await Results.find({}, null, { sort: 'wroteAt' }, function(err, docs) {
                if (err) {
                    res.json(err);
                }
            })
            .populate('exam');
        results = results.filter(item => item.exam.semester == filter.semester && item.exam.class == req.query.student.class._id);

        var response = "";
        if (results && results.length > 0) {
            response = "This is the results that i've found: \n ";
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

module.exports = ResultsMiddleware;