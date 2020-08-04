var express = require('express');
var StudentMiddleware = require('../middleware/StudentMiddleware');

var StudentRoutes = function(app) {
    var router = express.Router();


    router.route('/student')
        .post(StudentMiddleware.find);

    router.route('/students/all')
        .get(StudentMiddleware.findAll);

    return router;
}
module.exports = StudentRoutes;