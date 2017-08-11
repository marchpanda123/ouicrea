var User = require('../models/user.js');

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
	
	return router;
}

