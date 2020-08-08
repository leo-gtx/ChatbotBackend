var Student = require('../model/studentModel');


var StudentMiddleware = {

    findAll: async(req, res) => {
        Student.find().lean().exec((err, doc) => {
            if (err) {
                res.json(err);
            }
            res.json({
                message: 'success',
                description: 'Student retrieved!',
                results: doc
            });
        });
    },
    find: async(req, res) => {
        var filter = {
            'email': req.body.email,
            'password': req.body.password
        }
        var results = await Student.find(filter, function(err, doc) {
                if (err) {
                    res.json(err);
                }

            })
            .populate({
                path: 'class',
                populate: {
                    path: 'department'
                }
            });

        res.json({
            message: 'success',
            description: 'Student found!',
            results: results
        });
    }
}
module.exports = StudentMiddleware;