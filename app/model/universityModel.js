var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var universitySchema = new Schema({
    name: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    address: String,
    auth2: String,
    logo: { type: String, required: true },
    departments: [{ type: Schema.Types.ObjectId, ref: 'department' }]
});
var universityModel;
if (mongoose.models.university)
    universityModel = mongoose.model('university');
else
    universityModel = mongoose.model('university', universitySchema);

module.exports = universityModel;