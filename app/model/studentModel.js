var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
    email: { type: String, required: true, 'unique': true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    lastLogin: { type: Date, default: Date.now() },
    class: { type: Schema.Types.ObjectId, ref: 'class' }
});
var studentModel;
if (mongoose.models.student)
    studentModel = mongoose.model('student');
else
    studentModel = mongoose.model('student', studentSchema);
module.exports = studentModel;