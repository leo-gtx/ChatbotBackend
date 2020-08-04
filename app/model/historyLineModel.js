var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historyLineSchema = new Schema({
    askAt: { type: Date, required: true },
    query: { type: String, required: true },
    answer: { type: String, required: true },
    invalidAnswer: { type: Boolean, default: false },
    student: { type: Schema.Types.ObjectId, ref: 'student' }
});
var historyLineModel;
if (mongoose.models.historyLine)
    historyLineModel = mongoose.model('historyLine');
else
    historyLineModel = mongoose.model('historyLine', historyLineSchema);
module.exports = historyLineModel;