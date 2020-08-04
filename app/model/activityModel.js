var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
    description: { type: String, required: true },
    at: { type: Date, required: true },
    wroteAt: { type: Date, default: Date.now() },
    department: { type: Schema.Types.ObjectId, ref: 'department' },
    files: [{
        name: { type: String, required: true },
        updateAt: { type: Date, default: Date.now() }
    }]
});
var activityModel;
if (mongoose.models.activity)
    activityModel = mongoose.model('activity');
else
    activityModel = mongoose.model('activity', activitySchema);
module.exports = activityModel;