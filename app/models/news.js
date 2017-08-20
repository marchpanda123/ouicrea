var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NewsSchema = new Schema({
	n_title: {type: String},
	n_bref: {type: String},
	n_content: {type: String},
    n_page:{type: String},
    n_belongUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    n_belongTag:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Tag'
    },
    created:{type:Date, default:Date.now}
});

module.exports = mongoose.model('News', NewsSchema);