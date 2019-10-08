/*
    Require modules
*/
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const es6Renderer = require('express-es6-template-engine');

//Connecting to database
var {mongoose} = require('./server/mongoose.js');

/*
    View Engine
*/
var app = express();
// app.use([path,] callback [, callback...]) -> puts middleware fot the app
app.use(express.static(__dirname + '/views'));
app.use(express.static(path.join(__dirname, '/public')));
//app.use(favicon(__dirname + '/public/favicon.ico'));
// app.engine('.extenionName', renderingEngine) -> renders files
//app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
//app.engine('html', require('handlebars').renderFile);
app.engine('html', es6Renderer);
app.set('views', 'views');

app.set('view engine', 'html');

//app.engine('html', require('handlebars'));
//app.engine('html', require('./htmlEngine'));
// app.set('view engine', 'engineToUse') -> sets default viewing engine
//app.set('view engine', 'handlebars');
//app.set('view engine', 'html');





/*
    Bodyparser Middleware + Express session
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
// session -> keep the user loggin after he login in on the website
//         -> creates an object req.session, where you can add properties
//         -> (ex: req.session.page_views, to count how many times he entered on the page)
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

/*
    Initialize Passport (authetification) to keep persisten login data (i.e in cookies)
*/
app.use(passport.initialize());
app.use(passport.session());

/*
     Validator to validate data incoming with the re object to the server
*/
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


/*
    Flash to pop-up mesages in the browser
*/
app.use(flash());
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

/*
    Ensure authetification
*/
app.use('/app', (req, res, next) => {
    // check to be authentificated
    if (req.isAuthenticated()) { // if yes, continue
        return next();
    } else {                     // if no, login
        // req.flash('error_msg', 'You are not logged in');
        res.redirect('/');
    }
});

/*
    Website routes
*/
 var addressRoutes = require('./routes/address.routes');
 var pgRoute = require('./routes/pg.routes');

// var users = require('./routes/users');
// var appRoute = require('./routes/app');
// var patients = require('./routes/patients');
// var settings = require('./routes/settings');
// var diseases = require('./routes/diseases');
// var rooms = require('./routes/rooms');

 app.use('/', addressRoutes);
 app.use('/', pgRoute);
// app.use('/', users);
// app.use('/', patients);
// app.use('/', settings);
// app.use('/', diseases);
// app.use('/', rooms);

var timestamp = new Date().getTime();

/*
    Fire the server online
*/
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() {
	console.log('Server started on port '+ app.get('port'));
});


app.get('/', function (req, res) {
  res.redirect('/index');
});

  app.get('/index', function (req, res) {
    res.render('index', {locals: {title: 'Welcome!',
  banners: [
    { 
      dt: '1', 
    },
    { 
      dt: '2', 
    },
    { 
      dt: '3', 
    },
    { 
      dt: '4', 
    }
    
  ]
  }});
    //res.sendfile(__dirname + '/aranoz/index.html');
  });

app.get('/category', function (req, res) {
    res.render('category');//, {locals: {title: 'Welcome!'}});
  });

app.get('/cart', function (req, res) {
    res.render('cart');//, {locals: {title: 'Welcome!'}});
  });

app.get('/blog', function (req, res) {
    res.render('blog');//, {locals: {title: 'Welcome!'}});
  });
app.get('/checkout', function (req, res) {
    res.render('checkout');//, {locals: {title: 'Welcome!'}});
  });

  app.get('/confirmation', function (req, res) {
    res.render('confirmation');//, {locals: {title: 'Welcome!'}});
  });

  app.get('/contact', function (req, res) {
    res.render('contact');//, {locals: {title: 'Welcome!'}});
  });

  app.get('/elements', function (req, res) {
    res.render('elements');//, {locals: {title: 'Welcome!'}});
  });

  app.get('/feature', function (req, res) {
    res.render('feature');//, {locals: {title: 'Welcome!'}});
  });

  app.get('/login', function (req, res) {
    res.render('login');//, {locals: {title: 'Welcome!'}});
  });

  app.get('/single-blog', function (req, res) {
    res.render('single-blog');//, {locals: {title: 'Welcome!'}});
  });

  app.get('/single-product', function (req, res) {
    res.render('single-product');//, {locals: {title: 'Welcome!'}});
  });

  app.get('/tracking', function (req, res) {
    res.render('tracking');//, {locals: {title: 'Welcome!'}});
  });


  app.get('/admin/index', function (req, res) {
    res.render('admin/pages/tables/basic-table');//, {locals: {title: 'Welcome!'}});
  });