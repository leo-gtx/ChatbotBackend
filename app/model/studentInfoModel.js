var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentInfoSchema = new Schema({
    description: { type: String, required: true },
    wroteAt: { type: Date, default: Date.now() },
    department: { type: Schema.Types.ObjectId, ref: 'department' },
    files: [{
        name: { type: String, required: true },
        updateAt: { type: Date, default: Date.now() }
    }]
});
var studentInfoModel;
if (mongoose.models.studentInfo)
    studentInfoModel = mongoose.model('studentInfo');
else
    studentInfoModel = mongoose.model('studentInfo', studentInfoSchema);
module.exports = studentInfoModel;