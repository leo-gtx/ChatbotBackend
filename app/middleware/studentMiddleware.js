const Student = require('../model/studentModel');
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../keys/keys');
const bcrypt = require('bcrypt');

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
        if (!req.body) return res.sendStatus(400);
        res.setHeader('Content-Type', 'application/json');
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
    },
    login: async(req, res) => {
        const { email, password } = req.body;
        //console.log(req);
        var user = await Student.findOne({ email: email, encryptedPassword: password }, function(err, doc) {
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
        console.log(user);

        try {
            if (user) {
                const token = jwt.sign(JSON.stringify(user), SECRET_KEY);
                user.token = token;
                //Store Token in db
                Student.findOneAndUpdate({ email: user.email }, { lastLogin: Date.now() }, function(err, doc) {
                    if (err) {
                        res.json(err);
                    }
                });
                console.log(token);
                //Send Student details

                res.json({
                    success: true,
                    description: 'Student authenticated!',
                    results: user
                });
            }
            res.json({
                success: false,
                description: 'Email or password is wrong!'
            });


        } catch (e) {
            console.log('e:', e);
            return null
        }


    }
}
module.exports = StudentMiddleware;