var express = require('express');
var router = express.Router();
var Verify = require('./verify.js');
var News = require('../models/news.js');
var Tag = require('../models/tag.js');
var Project = require('../models/project.js');

var newsCtrl = require('../controller/newsctrl.js');
var tagCtrl = require('../controller/tagctrl.js');
var projectCtrl = require('../controller/projectctrl.js');

router.use(function(req, res, next) {
	console.log('Something is happening.');
	next();
});

//news router
router.get('/news', newsCtrl.newsGet);
router.post('/news', Verify.verifyOrdinaryUser, newsCtrl.newsPost);
router.get('/news/:newsId', newsCtrl.newsGetId);
router.put('/news/:newsId', Verify.verifyOrdinaryUser, newsCtrl.newsPutId);
router.delete('/news/:newsId', Verify.verifyOrdinaryUser, newsCtrl.newsDeleteId);

//tag router
router.get('/tag', tagCtrl.tagGet);
router.post('/tag', Verify.verifyOrdinaryUser, tagCtrl.tagPost);
router.get('/tag/:tagId', tagCtrl.tagGetId);
router.put('/tag/:tagId', Verify.verifyOrdinaryUser, tagCtrl.tagPutId);
router.delete('/tag/:tagId', Verify.verifyOrdinaryUser, tagCtrl.tagDeleteId);

//tag router
router.get('/project', projectCtrl.projectGet);
router.post('/project', projectCtrl.projectPost);
router.get('/project/:projectId', projectCtrl.projectGetId);
router.put('/project/:projectId', projectCtrl.projectPutId);
router.delete('/project/:projectId', projectCtrl.projectDeleteId);

module.exports = router;