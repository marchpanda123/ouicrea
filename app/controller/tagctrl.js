var mongoose = require('mongoose');
var Tag = mongoose.model('Tag');

module.exports.tagGet = function(req, res) {
	Tag.find(function(err, tag) {
		if(err) res.send(err);
		res.json(tag);
	});
}

module.exports.tagPost = function(req, res) {

	var tag = new Tag();
	tag.t_name = req.body.t_name;
	tag.save(function(err) {
		if(err) res.send(err);
		res.json(tag);
	});
}

module.exports.tagGetId = function(req, res) {
	Tag.findById(req.params.tagId, function(err,tag) {
		if(err) res.send(err);
		res.json(tag);
	})
}

module.exports.tagPutId = function(req, res) {
	Tag.findById(req.params.tagId, function(err, tag) {
		if(err) res.send(err);
		tag.t_name = req.body.t_name;
		tag.save(function(err) {
			if(err) res.send(err);
			res.json(tag);
		})
	})
}


module.exports.tagDeleteId = function(req, res) {
	Tag.remove({
		_id: req.params.tagId
	}, function(err, tag) {
		if(err) res.send(err);
		res.json({ message:'Successfully delete'});
	});
}