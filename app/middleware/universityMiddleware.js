var University = require('../model/universityModel');

var UniversityMiddleware = {
    create: function(req, res) {
        //Create university
        var name = req.body.name;
        var country = req.body.country;
        var city = req.body.city;
        var address = req.body.address;
        var auth2 = req.body.auth2;
        var logo = req.body.logo;

        //Check if the name of university already exists
        University.find({ 'name': name }, function(err, usr) {
            if (usr.length > 0) {
                res.json('Name already exists');
                return;
            } else {
                //New name
                //Create university
                var university = new University();
                university.name = name;
                university.country = country;
                university.city = city;
                university.address = address;
                university.auth2 = auth2;
                university.logo = logo;

                //Validate the university
                university.validate(function(err) {
                    if (err) {
                        res.json(err);
                        return;
                    } else {
                        university.save(function(err) {
                            if (err) {
                                res.json(err);
                                return;
                            }
                            //Sending university details
                            res.json({
                                message: 'success',
                                description: 'University created',
                                results: university
                            });
                        });
                    }
                });
            }
        });


    },
    find: async(req, res) => {
        var found = await University.find({
                'name': req.params.name,
                function(err, usr) {
                    if (err) {
                        res.json(err);
                        return;
                    }
                }
            })
            .populate('departments', '-university');

        //Sending details
        res.json({
            'message': 'success',
            'description': 'University found!',
            'results': found
        });

    },
    update: async(req, res) => {
        var filter = { '_id': req.body.university };
        var updated = {
            'name': req.body.name,
            'country': req.body.country,
            'city': req.body.city,
            'address': req.body.address,
            'auth2': req.body.auth2
        };
        var results = await University.findOneAndUpdate(filter, updated);
        //Sending details
        res.json({
            'message': 'success',
            'description': 'University was updated succesfully!',
            'results': results
        })

    },
    findAll: async(req, res) => {
        University.find().lean().exec((err, doc) => {
            if (err) {
                res.json(err);
            }
            res.json({
                'message': 'success',
                'description': 'University retrieved!',
                'results': doc
            });

        });

    },
    remove: async(req, res) => {
        var filter = { '_id': req.params.university }
        University.remove(filter);
        //Sending details
        res.json({
            'message': 'success',
            'description': 'The university was successfully deleted!'
        })
    }
};
module.exports = UniversityMiddleware;