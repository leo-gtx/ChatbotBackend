var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var examSchema = new Schema({
    description: { type: String, required: true },
    wroteAt: { type: Date, default: Date.now() },
    semester: { type: Number, default: 1 },
    results: { type: Schema.Types.ObjectId, ref: 'results' },
    class: { type: Schema.Types.ObjectId, ref: 'class' },
    files: [{
        name: { type: String, required: true },
        updateAt: { type: Date, default: Date.now() }
    }]
});
var examModel;
if (mongoose.models.exam)
    examModel = mongoose.model('exam');
else
    examModel = mongoose.model('exam', examSchema);
module.exports = examModel;