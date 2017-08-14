var User = require('../models/user.js');
var jwt = require('jsonwebtoken');
var secret = 'ouicreasecret';

exports.verifyOrdinaryUser = function(req, res, next) {
	var token = req.body.token || req.body.query || req.headers['x-access-token'];

	if(token) {
		jwt.verify(token, secret, function(err, decoded) {
			if(err) {
				res.json({ success: false, message: 'Token invalid' });
			} else {
				req.decoded = decoded;
				next();
                console.log(decoded);
			}
		});
	} else {
		res.send({ success: false, message: 'No token provided'});
	}
};