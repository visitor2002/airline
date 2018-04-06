#!/usr/bin/env node

var http = require('http');
var flights = require('./data');
var db = require('./db');
// var repl = require('repl');
var argv = require('optimist').argv;
var app = require('./app')(flights, db);

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// var prompt = repl.start({prompt: 'flights>'});

// prompt.context.data = flights;
// console.log(argv);
// console.log(process.argv);


if (argv.flight && argv.destination) {
  flights[argv.flight].data.destination = argv.destination;
}