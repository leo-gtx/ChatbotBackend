var config = {
    VERSION: 1,
    BUILD: 1,
    URL: 'http://127.0.0.1' || process.env.URL,
    API_PATH: '/api',
    PORT: process.env.PORT || 8080,
    DB: {
        //MongoDB configuration
        HOST: 'localhost',
        PORT: '27017',
        DATABASE: 'studentInformationDB',
        USER: 'heroku_5dt5dshz',
        PASSWORD: 'ndl40320'
    },
    /*
     * Get DB Connection String for connecting to MongoDB database
     */
    getDBString: function() {
        return 'mongodb://' + this.USER + ':' + this.PASSWORD + '@ds247141.mlab.com:47141/heroku_5dt5dshz';
    },
    /*
     * Get the http URLGoalKicker.com – Node.js Notes for Professionals 184
     */
    getHTTPUrl: function() {
        return 'http://' + this.URL + ":" + this.PORT;
    }
}
module.exports = config;
