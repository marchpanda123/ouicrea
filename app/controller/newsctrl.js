var mongoose = require('mongoose');
var News = mongoose.model('News');

module.exports.newsGet = function(req, res) {

	News.find()
	.populate('n_belongTag')
	.populate('n_belongUser')
	.sort('-created')
	.exec(function(err, news){
		if(err) res.send(err);
		res.send(news);
	})
}

module.exports.newsPost = function(req, res) {

	var news = new News();
	news.n_title = req.body.n_title;
	news.n_bref = req.body.n_bref;
	news.n_content = req.body.n_content;
	news.n_page = req.body.n_page;
	news.n_belongUser = req.body.n_belongUser;
	news.n_created = req.body.n_created;
	news.n_belongTag = req.body.n_belongTag;
	news.save(function(err) {
		if(err) res.send(err);
		res.json(news);
	});
}

module.exports.newsGetId = function(req, res) {
	News.findById(req.params.newsId, function(err,news) {
		if(err) res.send(err);
		res.json(news);
	})
}

module.exports.newsPutId = function(req, res) {
	News.findById(req.params.newsId, function(err, news) {
		if(err) res.send(err);
		news.n_title = req.body.n_title;
		news.n_bref = req.body.n_bref;
		news.n_content = req.body.n_content;
		news.n_page = req.body.n_page;
		news.n_belongUser = req.body.n_belongUser;
		news.n_created = req.body.n_created;
		news.n_belongTag = req.body.n_belongTag;
		news.save(function(err) {
			if(err) res.send(err);
			res.json(news);
		})
	})
}


module.exports.newsDeleteId = function(req, res) {
	News.remove({
		_id: req.params.newsId
	}, function(err, news) {
		if(err) res.send(err);
		res.json({ message:'Successfully delete'});
	});
}