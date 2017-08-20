var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
	p_name: {type: String},
	p_contact: {type: String},
	p_content: {type: String},
    created:{type:Date, default:Date.now}
});

module.exports = mongoose.model('Project', ProjectSchema);