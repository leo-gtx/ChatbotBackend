var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({
    description: { type: String, required: true },
    wroteAt: { type: Date, default: Date.now() },
    semester: { type: Number, default: 1 },
    date: { type: Date, default: Date.now() },
    department: { type: Schema.Types.ObjectId, ref: 'department' },
    files: [{
        name: { type: String, required: true },
        updateAt: { type: Date, default: Date.now() }
    }]
}, {
    collection: 'courses'
});
var courseModel;
if (mongoose.models.course)
    courseModel = mongoose.model('course');
else
    courseModel = mongoose.model('course', courseSchema);
module.exports = courseModel;