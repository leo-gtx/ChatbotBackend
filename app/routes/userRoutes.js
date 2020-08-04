var express = require('express');
var UserMiddleware = require('../middleware/UserMiddleware');

var UserRoutes = function(app) {
    var router = express.Router();


    router.route('/user')
        .post(UserMiddleware.find);

    router.route('/users/all')
        .get(UserMiddleware.findAll);

    return router;
}
module.exports = UserRoutes;