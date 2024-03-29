var config = {
    VERSION: 1,
    BUILD: 1,
    URL: 'http://127.0.0.1',
    API_PATH: '/api',
    PORT: process.env.PORT || 8080,
    DB: {
        //MongoDB configuration
        HOST: 'localhost',
        PORT: '27017',
        DATABASE: 'studentInformationDB'
    },
    /*
     * Get DB Connection String for connecting to MongoDB database
     */
    getDBString: function() {
        //return process.env.MONGODB_URI || 'mongodb://' + this.DB.HOST + ':' + this.DB.PORT + '/' + this.DB.DATABASE;
        return 'mongodb+srv://leo-gtx:mongodbpassword@chatbotcluster.kqj9j.mongodb.net/StudentInformationDB?retryWrites=true&w=majority'
    },
    /*
     * Get the http URLGoalKicker.com – Node.js Notes for Professionals 184
     */
    getHTTPUrl: function() {
        return 'http://' + this.URL + ":" + this.PORT;
    }
}
module.exports = config;