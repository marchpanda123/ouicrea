var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
	p_username:{type:String},
	p_usercontact: {type: String},
	p_title: {type: String},
	p_content: {type: String},
    created:{type:Date, default:Date.now}
});

module.exports = mongoose.model('Project', ProjectSchema);