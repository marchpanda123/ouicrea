var mongoose = require('mongoose');
var Project = mongoose.model('Project');

module.exports.projectGet = function(req, res) {
	Project.find(function(err, project) {
		if(err) res.send(err);
		res.json(project);
	});
}

module.exports.projectPost = function(req, res) {

	var project = new Project();
	project.p_username = req.body.p_username;
	project.p_usercontact = req.body.p_usercontact;
	project.p_title = req.body.p_title;
	project.p_content = req.body.p_content;
	project.save(function(err) {
		if(err) res.send(err);
		res.json(project);
	});
}

module.exports.projectGetId = function(req, res) {
	Project.findById(req.params.projectId, function(err,project) {
		if(err) res.send(err);
		res.json(project);
	})
}

module.exports.projectPutId = function(req, res) {
	Project.findById(req.params.projectId, function(err, project) {
		if(err) res.send(err);
		project.p_username = req.body.p_username;
		project.p_usercontact = req.body.p_usercontact;
		project.p_title = req.body.p_title;
		project.p_content = req.body.p_content;
		project.save(function(err) {
			if(err) res.send(err);
			res.json(project);
		})
	})
}


module.exports.projectDeleteId = function(req, res) {
	Project.remove({
		_id: req.params.projectId
	}, function(err, project) {
		if(err) res.send(err);
		res.json({ message:'Successfully delete'});
	});
}