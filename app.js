
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var headers = require('./headers');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*function authenticate(req, res, next) {
    var users = [{username: 'Hamid', password:'password'}];
    if (req.body && req.body.username) {
        if ( req.body.username in users) {
            // authentication here ...
            req.user = {
                name: 'Hamid'
            };
            next();
        }
    }
    res.json('401', 'Unauthorized ... ');
}*/

app.get('/', routes.index);
app.get('/users', user.list);

// login data
app.get('/login', function (req, res) {
    res.render('login');
});

app.post('/login' ,function (req, res) {
    // authentication code goes here ...
    //res.send('Login was succesful ... ');
    res.redirect('/');
});

app.get('/books', headers.isJSONDataRequested , function(req, res){

    // console.log(req.headers);
    // get req header
    // check the priority on application/json
    // if priority is json
    // res.json(200, { books: 'books data' });
    // else if the priority is an text/html
    if (req.isJSON) {
        res.json(200, {books:[{title:'The Moor\'s Last Sigh', author: 'Salman Rushdie'}]});
    } else {
        res.render('books');
    }
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
