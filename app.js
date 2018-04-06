module.exports = function(flights, db){

var express = require('express');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
// var MongoStore = require('connect-mongo')(express);
var passport = require('./auth');


var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var index = require('./routes/index');
var index = require('./routes/index')(flights);
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
//
  // app.use(express.cookieParser());
  // app.use(session({
  //   secret: 'keyboard cat',
  //   store: new MongoStore({
  //     mongoose_connection: db
  //   })
  // }));
  app.use(session({
    secret: 'keyboard cat',
    store: new MongoStore({
      // mongoose_connection: db
      mongooseConnection: db
    })
}));

app.use(passport.initialize());
app.use(passport.session());
//

app.use(express.static(path.join(__dirname, 'public')));




//
app.use(function(req, res, next){
  res.set('x-powered-by', 'Flight Tracker');
  next();
});
//

// app.use('/', index);
app.use('/', index.router);
app.use('/users', users);

/////
// var test = require('./routes/test');
// app.get('/flight1', test.flight1);
// app.get('/flight2', test.flight2);
// app.get('/flight2', function(req, res){
//  console.log('!!!');
// });
// var test = require('./routes/index');
// app.get('/flight1', test.flight1);
// app.get('/flight2', test.flight2);

// app.get('/flight1', index.flight1);
// app.get('/flight2', index.flight2);

app.get('/flight/:number', index.flight);
app.put('/flight/:number/arrived', index.arrived);
app.get('/list', index.list);
app.get('/list/json', index.listjson);
app.get('/arrivals', index.arrivals);
app.get('/login', index.login);
app.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/user'
}));
app.get('/user', index.user);
/////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
  return app;
};



