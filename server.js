var express = require('express');
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use('/fr', appRoutes);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ouicrea', { useMongoClient: true }, function(err) {
	if(err) {
		console.log('Not connected to the database:' + err);
	} else {
		console.log('Successfully connected to MongoDB');
	}
});

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port, function() {
    console.log('Running the server on port ' + port);
});