var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var classSchema = new Schema({
    name: { type: String, required: true },
    level: { type: Date, default: Date.now() },
    department: { type: Schema.Types.ObjectId, ref: 'department' },
});
var classModel;
if (mongoose.models.class)
    classModel = mongoose.model('class');
else
    classModel = mongoose.model('class', classSchema);
module.exports = classModel;