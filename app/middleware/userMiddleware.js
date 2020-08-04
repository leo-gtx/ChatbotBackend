var User = require('../model/userModel');


var UserMiddleware = {

    findAll: async(req, res) => {
        User.find().lean().exec((err, doc) => {
            if (err) {
                res.json(err);
            }
            res.json({
                message: 'success',
                description: 'User retrieved!',
                results: doc
            });
        });
    },
    find: async(req, res) => {
        var filter = {
            'email': req.body.email,
            'password': req.body.password
        }
        var results = await User.find(filter, function(err, doc) {
                if (err) {
                    res.json(err);
                }

            })
            .populate('department');

        res.json({
            message: 'success',
            description: 'User found!',
            results: results
        });
    }
}
module.exports = UserMiddleware;