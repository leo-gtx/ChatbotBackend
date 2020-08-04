var express = require('express');
var ChatbotMiddleware = require('../middleware/chatbotMiddleware');
var WebhookMiddleware = require('../middleware/webhookMiddleware');
//Route for chatbot
var ChatbotRoutes = function(app) {
    var router = express.Router();
    router.route('/chatbot')
        .post(ChatbotMiddleware);

    router.route('/webhook')
        .post(WebhookMiddleware);
    return router;
}
module.exports = ChatbotRoutes;