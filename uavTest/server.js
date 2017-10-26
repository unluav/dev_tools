/* app main imports */
var express = require('express');
var session = require('express-session');
var httpmod = require('http');
var bparser = require('body-parser');
var path = require('path');

/* import environment variables from our env.vars file */
require('dotenv').config({path: './env.vars'});

/* app secondary or module imports */
var router = require('./server/router');

/* app variables and objects */
var port = process.env.PORT || 8080;
var app = express();
var server = httpmod.Server(app);
var sio = require('socket.io')(server);
var maxage = 30 * 60 * 1000;
var sessmw = session({
	resave: true,
	saveUninitialized: false,
	secret: '1234',
	cookie: {maxAge: maxage},
});

/* app middleware */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bparser.json());
app.use(sessmw);
sio.use(function shareSession(socket, next){
	sessmw(socket.request, socket.request.res, next);
});
app.use('/', router);

/* connect the client and server sockets */
sio.on('connection', function connectedSockets(socket){

	console.info('Websocket enabled and connected!');

	var sess = socket.request.session;

	//sample request
	socket.on('sample', function response(data, callback){
		console.info('Received a sample request!');
		callback({ message: 'The server received your data: ' + data });
	});

	socket.on('getUserData', function sendUserData(data, callback){
		//TODO: connect to DB and retreive the information
		var joke = oneLinerJoke.getRandomJoke();
		callback({user_name: joke.body});
	});

	socket.on('checkSession', function checkSession(data, callback){
		if(sess && typeof sess.user != 'undefined'){
			callback(sess.user);
		}
		callback({isAuth: false});
	});

});

/* start the server */
server.listen(port, function listening(error){
	if(error){
		console.error(error);
	} else {
		console.info('Application running in port %d and in "%s" environment', port, process.env.NODE_ENV);
	}
});