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
        //Event find
    }
}
module.exports = EventMiddleware;