/* app main imports */
var express = require('express');
var path = require('path');

// initialize the router
var router = express.Router();
/* router middleware */
router.use(function routerLog(req, res, next){
	//here we do any logic we want before processing a request
	console.info('The root router received a request!');
	next();
});

/* define custom routes here */

// home page or index entry
router.get('/', function homePage(req, res){
	res.sendFile(path.resolve('index.html'));
});

// sample route
router.get('/env', function envPage(req, res){
	res.send('Application is running in ' + process.env.NODE_ENV + ' environment');
});


module.exports = router;