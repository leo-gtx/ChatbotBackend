var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    description: { type: String, required: true },
    semester: { type: Number, default: 1 },
    type: { type: String, required: true },
    date: { type: Date, required: true },
    wroteAt: { type: Date, default: Date.now() },
    department: { type: Schema.Types.ObjectId, ref: 'department' },
    files: [{
        name: { type: String, required: true },
        updateAt: { type: Date, default: Date.now() }
    }]

}, {
    collection: 'events'
});
var eventModel;
if (mongoose.models.event)
    eventModel = mongoose.model('event');
else
    eventModel = mongoose.model('event', eventSchema);
module.exports = eventModel;