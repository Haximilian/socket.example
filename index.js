var app = require('express')();
// http server part of node standard library
// parameter: router(req, res)
var http = require('http').createServer(app);
// start with http and upgrade
var io = require('socket.io')(http);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

// namespaces
// minimize tcp connection by multiplexing
var ontario = io
    .of('/ontario')
    .on('connection', function (socket) {
        socket.send('Welcome to lake ontario user: ' + socket.id);
        socket.on('cast', function (user) {
            // send is similar to emit with event 'message'
            ontario.send(user + ' has cast their net narrow!');
        });
    });

var michigan = io
    .of('/michigan')
    .on('connection', function (socket) {
        socket.send('Welcome to lake michigan user: ' + socket.id);
        socket.on('cast', function (user) {
            // send is similar to emit with event 'message'
            michigan.send(user + ' has cast their net wide!');
        });
    });

http.listen(3000, function(){
    console.log('listening on *:3000');
});