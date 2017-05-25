var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var app = express();
/*
var logger = function(reg, res, next){
	console.log('logging...');
	next();
}

app.use(logger);


*/

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parser middle layer
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Set static branch
app.use(express.static(path.join(__dirname, 'public')));
// Global Var 
app.use(function(req, res, next){
	res.locals.errors = null;
  res.type('application/xhtml+xml');
	next();
});

// Express Validator Middleware
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

var users = [
{
	id: 1,
	first_name: 'John',
	last_name: 'Doe',
	email: 'JD@user.com',
},
{
	id: 2,
	first_name: 'Bob',
	last_name: 'Yolo',
	email: 'BY@user.com',
},
{
	id: 3,
	first_name:'Jane',
	last_name: 'Robin',
	email: 'JR@user.com',
}
]

app.get('/', function(reg,res){
	var title = 'Customers';
   res.render('ejsindex', {
   	title: 'Customers',
   	users: users
   });
});

app.post('/users/add', function(req, res){

    req.checkBody('first_name', 'First Name is Required').notEmpty();
    req.checkBody('last_name', 'Last Name is Required').notEmpty();
    req.checkBody('email', 'Email is Required').notEmpty();
    
    var errors = req.validationErrors();
    if(errors){
       res.render('ejsindex', {
   	title: 'Customers',
   	users: users
   });
    } else{
    	var newUser = {
    		first_name: req.body.first_name,
    		last_name: req.body.last_name,
    		email: req.body.email
    	}
    	console.log('Success');
    }
   });

app.listen(3000, function(){
	console.log('server started on port 3000');
})

var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('User');

db.serialize(function(){
 db.run("DROP TABLE IF EXISTS webperson");
 db.run("CREATE TABLE webperson (Username TEXT, Email TEXT, Password TEXT)");
 
// var srmt = db.prepare("INSERT INTO person values(?,?,?)");

 //stmt.finalize();

 db.each("SELECT Username, Email, Password FROM webperson",function(err,row)
{
  console.log("User.Username"+row.Username, row.Email); 

  });
});

 db.close();

 var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('User.db');
var exphbs  = require('express-handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

app.post('/registeruser', function (req, res) {
  console.log("Inside register user");
  //var name = req.body.uname;
  console.log(req.body.uname);
  console.log(req.body.PName);
  //DATABASE CALLS TO GET REVIEWS
    res.render('main', {name: req.body.uname});
});
