var express = require('express');
var StudentMiddleware = require('../middleware/studentMiddleware');

var StudentRoutes = function(app) {
    var router = express.Router();

    router.route('/student')
        .post(StudentMiddleware.find);

    router.route('/student/login')
        .post(StudentMiddleware.login);

    return router;
}
module.exports = StudentRoutes;