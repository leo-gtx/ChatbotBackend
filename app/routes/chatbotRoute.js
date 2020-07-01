var express = require('express');
var ChatbotMiddleware = require('../middleware/chatbotMiddleware');
//Route for chatbot
var ChatbotRoutes = function(app) {
    var router = express.Router();
    router.route('/chatbot')
        .post(ChatbotMiddleware);
    return router;
}
module.exports = ChatbotRoutes;