var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedbackSchema = new Schema({
    problem: { type: String },
    rate: { type: Number, required: true },
    student: { type: Schema.Types.ObjectId, ref: 'student' }
});
var feedbackModel;
if (mongoose.models.feedback)
    feedbackModel = mongoose.model('feedback');
else
    feedbackModel = mongoose.model('feedback', feedbackSchema);
module.exports = feedbackModel;