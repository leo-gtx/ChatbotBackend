var express = require('express');
var UniversityMiddleware = require('../middleware/universityMiddleware');

var UniversityRoutes = function(app) {
    var router = express.Router();

    router.route('/universities')
        .post(UniversityMiddleware.create);

    router.route('/university/:name')
        .get(UniversityMiddleware.find);

    router.route('/universities/update')
        .post(UniversityMiddleware.update);

    router.route('/universities/all')
        .get(UniversityMiddleware.findAll);

    router.route('/universities/remove/:university')
        .get(UniversityMiddleware.remove);
    return router;
}
module.exports = UniversityRoutes;