var User = require('../models/user.js');
var Verify = require('./verify.js');
var jwt = require('jsonwebtoken');
var secret = 'ouicreasecret';
//upload image
var multer = require('multer');
var uploadNewsPage = multer({ dest: 'public/uploads/newspage' });

module.exports = function(router){

	router.post('/users', function(req, res) {
		var user = new User();
		user.username = req.body.username;
		user.password = req.body.password;
		user.email = req.body.email;
		user.save(function(err) {
			if(err) {
				res.send(err);
			} else {
				res.send('user created!');
			}
		});
	});

	router.post('/authenticate', function(req, res) {
		User.findOne({ username: req.body.username })
		.select('email username password')
		.exec(function(err, user) {
			if(err) throw err;
			if(!user) {
				res.json({ success: false, message: 'Could not authenticate user' });
			} else if(user) {
				if(!req.body.password) {
					res.json({ success: false, message: 'No password provided'});
				} else {
					var validPassword = user.comparePassword(req.body.password);
					console.log(validPassword);
					if(!validPassword) {
						res.json({ success: false, message: 'Could not authenticate password' });
					} else {
						var token = jwt.sign({username:user.username,email:user.email} , secret, { expiresIn: '24h' });
						res.json({ success: true, message: '用户名正确！', token: token });
					}
				}
				
			}
		});
	});

	//Verfy Request!

	router.post('/me', Verify.verifyOrdinaryUser, function(req, res) {
		res.send(req.decoded);
	});

	//image post api
	router.post('/uploadNewsPage', uploadNewsPage.any(),function(req, res) {
	    var imageInfo = req.files[0];
	    console.log(imageInfo);
	    res.json(imageInfo);
	});

	return router;
}

