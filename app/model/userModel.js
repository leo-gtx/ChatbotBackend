var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: { type: Schema.Types.ObjectId, ref: 'department' }
});
var userModel;
if (mongoose.models.user)
    userModel = mongoose.model('user');
else
    userModel = mongoose.model('user', userSchema);
module.exports = userModel;