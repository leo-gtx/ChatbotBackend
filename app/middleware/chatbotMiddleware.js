// Imports the Dialogflow library
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
// projectId: ID of the GCP project where Dialogflow agent is deployed
const projectId = 'jasper-dvrtid';
// sessionId: String representing a random number or hashed user identifier
const sessionId = uuid.v4();

var Chatbot = function(req, res) {
    //Store token
    console.log(req.session.token);
    // queries: A set of sequential queries to be send to Dialogflow agent for Intent Detection
    const query = req.body.MSG;
    // languageCode: Indicates the language Dialogflow agent should use to detect intents
    const languageCode = 'en';

    // Instantiates a session client
    const sessionClient = new dialogflow.SessionsClient({
        keyFilename: "./jasper-dvrtid-2bb0627c3ff9.json"
    });

    async function detectIntent(
        projectId,
        sessionId,
        query,
        contexts,
        languageCode
    ) {
        // The path to identify the agent that owns the created intent.
        const sessionPath = sessionClient.projectAgentSessionPath(
            projectId,
            sessionId
        );

        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: query,
                    languageCode: languageCode,
                },
            },
        };

        if (contexts && contexts.length > 0) {
            request.queryParams = {
                contexts: contexts,
            };
        }

        const responses = await sessionClient.detectIntent(request);
        return responses[0];
    }

    async function executeQueries(projectId, sessionId, query, languageCode) {
        // Keeping the context across queries let's us simulate an ongoing conversation with the bot
        let context;
        let intentResponse;

        try {
            console.log(`Sending Query: ${query}`);
            intentResponse = await detectIntent(
                projectId,
                sessionId,
                query,
                context,
                languageCode
            );
            console.log('Detected intent');
            console.log(
                `Fulfillment Text: ${intentResponse.queryResult.fulfillmentText}`
            );
            // Use the context from this response for next queries
            context = intentResponse.queryResult.outputContexts;
            //console.log(intentResponse.queryResult);
            //Send the reply to the client 
            res.header('Access-Control-Allow-Origin', '*');
            res.json({
                'success': true,
                'reply': `${intentResponse.queryResult.fulfillmentText}`
            });
        } catch (error) {
            console.log(error);
        }

    }
    executeQueries(projectId, sessionId, query, languageCode);
}
module.exports = Chatbot;