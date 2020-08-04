var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resultsSchema = new Schema({
    description: { type: String, required: true },
    wroteAt: { type: Date, default: Date.now() },
    exam: { type: Schema.Types.ObjectId, ref: 'exam' },
    files: [{
        name: { type: String, required: true },
        updateAt: { type: Date, default: Date.now() }
    }]
});
var resultsModel;
if (mongoose.models.results)
    resultsModel = mongoose.model('results');
else
    resultsModel = mongoose.model('results', resultsSchema);
module.exports = resultsModel;