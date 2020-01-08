
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
//database setting
var MongoStore = require('connect-mongo')(express);
var settings = require('./models/setting');
//session info setting
var flash = require('connect-flash');
//websocket communication setting
var socket = require('socket.io');

var app = express();

//define httpserver
var httpserver = http.createServer(app);

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views')); //search engine foreach
app.set('view engine', 'ejs'); //set engine
//use flash to do with session
app.use(flash());

app.use(express.favicon());
app.use(express.logger('dev')); //print client device request info
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
//cookies for login/register setting
app.use(express.cookieParser());
app.use(express.session({
	secret: settings.cookieSecret,
	key: settings.db,
	cookie: {maxAge: 1000*60*60*24*30}, // 30 days
	store: new MongoStore({
		url: 'mongodb://localhost/booksmanager'
	})
}));


app.use(app.router);
app.use(express.static(path.join(__dirname, 'public'))); //set the folder that will be put static source

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

//export to routes（app）
//app.get('/', routes.index);
//app.get('/users', user.list);
//app.get('/search',routes.search);

routes(app);

//set communication stream
var stream = socket.listen(httpserver);
//messages box
var messages = ["testing2: hello~","testing3: byebye"];

//bind event'on'
stream.sockets.on("connection",function(server) {
	console.debug(new Date() + "socket.io with client connected..." + "\n");
	server.on("getAllMessages",function() {
		server.emit("allMessages",messages);
	});
	server.on("createMessage",function(message) {
		messages.push(message);
		server.emit("messageAdded",message);
	});
});


httpserver.listen(app.get('port'), function(){
  console.info ('Express server listening on port ' + app.get('port'));
});