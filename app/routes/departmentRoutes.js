var express = require('express');
var DepartmentMiddleware = require('../middleware/departmentMiddleware');

var DepartmentRoutes = function(app) {
    var router = express.Router();

    router.route('/departments')
        .post(DepartmentMiddleware.create);

    router.route('/departments/all')
        .get(DepartmentMiddleware.findAll);

    router.route('/department/:name')
        .get(DepartmentMiddleware.find);

    return router;
}
module.exports = DepartmentRoutes;