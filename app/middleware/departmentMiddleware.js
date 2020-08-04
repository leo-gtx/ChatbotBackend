var Department = require('../model/departmentModel');
var University = require('../model/universityModel');
var DepartmentMiddleware = {
    create: function(req, res) {
        //Create departments
        var name = req.body.name;
        var reference = req.body.reference;
        var university = req.body.university;
        //Check if department already exists
        Department.find({ 'name': name, 'university': university }, function(err, usr) {
            if (usr.length > 0) {
                res.json('Name already exists!');
                return;
            } else {
                //Create department
                var department = new Department();
                department.name = name;
                department.reference = reference;
                department.university = university;

                //Validate the department
                department.validate(function(err) {
                    if (err) {
                        res.json(err);
                        return;
                    } else {
                        department.save(function(err) {
                            if (err) {
                                res.json(err);
                                return;
                            }
                            University.find({ '_id': department.university }, function(err, usr) {
                                if (usr.length > 0) {
                                    //console.log(usr);
                                    usr[0].departments.push(department._id);
                                    usr[0].save(function(err) {
                                        if (err) {
                                            res.json(err);
                                            return;
                                        }
                                    });
                                }
                            });
                            //sending the department details
                            res.json({
                                'message': 'success',
                                'description': 'Department was successfully added!',
                                'results': department
                            });
                        })
                    }
                })
            }
        })

    },
    findAll: async(req, res) => {
        Department.find().lean().exec((err, doc) => {
            if (err) {
                res.json(err);
            }
            res.json({
                message: 'success',
                description: 'Department retrieved!',
                results: doc
            });
        });
    },
    find: async(req, res) => {
        var filter = {
            'name': req.params.name
        }
        var results = await Department.find(filter, function(err, doc) {
                if (err) {
                    res.json(err);
                }

            })
            .populate('university', '-departments');

        res.json({
            message: 'success',
            description: 'Department found!',
            results: results
        });
    }
}
module.exports = DepartmentMiddleware;