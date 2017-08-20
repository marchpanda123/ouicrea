var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new Schema({
	t_name:{type:String},
    created:{type:Date, default:Date.now}
});

module.exports = mongoose.model('Tag', TagSchema);