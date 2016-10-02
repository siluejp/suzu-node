
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , stormfall = require('./routes/stormfall')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3001);
  app.set('views', __dirname + '/views');
  //app.set('view engine', 'jade');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
    //app.use(express.static(path.join(__dirname, 'public')));
  //app.use(express.static(__dirname + '/public'));
  app.use('/js',express.static(path.join(__dirname, 'public/javascripts')));
  app.use('/css',express.static(path.join(__dirname, 'public/stylesheets')));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
  app.set('transports', ['xhr-polling']);
  app.set('polling duration', 10);
});

app.get('/', routes.index);
app.get('/webrtc', routes.webrtc);
app.get('/users', user.list);
app.get('/form', routes.form);
app.get('/game', routes.game);
app.get('/edge', routes.edge);
app.get('/score_list', routes.score_list);
app.get('/stormfall', stormfall.index);
app.get('/stormfall/troops.json', stormfall.troops);
app.post('/create', routes.create);
app.post('/money', routes.money);
app.post('/score', routes.score);


//http.createServer(app).listen(app.get('port'), function(){
//  console.log("Express server listening on port " + app.get('port'));
//});

var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(app.get('port'), function(){
   console.log("Express server listening on port " + app.get('port'));
});

var chats = [];
var sockets = [];

// broadcast function
var chats = [];
var sockets = [];

// broadcast function
function broadcast(method, messsage) {
    for (var n in sockets) {
        sockets[n].emit(method, messsage);
    }
}

io
.of('/chat')
.on('connection', function(socket) {
    socket[socket.id] = socket;
    socket.emit('chat.list', chats); //イベントを実行した方に実行する
    socket.on('chat.add', function(data) {
       data.time = Date.now();
       chats.push(data);
       //broadcast('chat.add', data);

        //イベントを実行した方に実行する
        socket.emit('chat.add', data);
        //イベントを実行した方以外に実行する
        socket.broadcast.emit('chat.add', data);

    });
    socket.on('disconnect', function() {
       delete sockets[socket.id];
    });
 });

app.get('/socket', function(req, res) {
    res.render('socketio', {title:'Socket.IO Demo'});
});
