var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var departmentSchema = new Schema({
    name: { type: String, required: true, unique: true },
    reference: { type: String, required: true },
    university: { type: Schema.Types.ObjectId, ref: 'university' }
});
var departmentModel;
if (mongoose.models.department)
    departmentModel = mongoose.model('department');
else
    departmentModel = mongoose.model('department', departmentSchema);
module.exports = departmentModel;