var express = require('express');
var EventMiddleware = require('../middleware/eventMiddleware');

var EventRoutes = function(app) {
    var router = express.Router();


    router.route('/events/all')
        .get(EventMiddleware.findAll);

    return router;
}
module.exports = EventRoutes;