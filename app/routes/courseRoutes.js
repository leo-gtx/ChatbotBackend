var express = require('express');
var CourseMiddleware = require('../middleware/courseMiddleware');

var CourseRoutes = function(app) {
    var router = express.Router();


    router.route('/courses/all')
        .get(CourseMiddleware.findAll);

    router.route('/courses/from/period')
        .post(CourseMiddleware.find);

    return router;
}
module.exports = CourseRoutes;