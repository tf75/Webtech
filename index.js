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
var cookieParser = require('cookie-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
var session = require('express-session');
// parse application/json
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

app.use(session({
  secret: 'havingagoodtime',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.get('/brasspig', function (req, res) {
    res.type('application/xhtml+xml');
    var data = [];
    db.each("SELECT Username, Text FROM Review WHERE Pubname = ? OR Pubname = ?", 'Brasspig', 'brasspig', function(err, row){
        data.push({name: row.Username, review: row.Text })
    });
    res.render('brasspig', {data});
});

app.get('/canteen', function (req, res) {
    res.type('application/xhtml+xml');
    var data = [];
    db.each("SELECT Username, Text FROM Review WHERE Pubname = ? OR Pubname = ?", 'Canteen', 'canteen', function(err, row){
        data.push({name: row.Username, review: row.Text })
    });
    res.render('canteen', {data});
});

app.get('/woods', function (req, res) {
    res.type('application/xhtml+xml');
    var data = [];
    db.each("SELECT Username, Text FROM Review WHERE Pubname = ? OR Pubname = ?", 'Woods', 'woods', function(err, row){
        data.push({name: row.Username, review: row.Text })
    });
    res.render('woods', {data});
});

app.get('/gallimaufry', function (req, res) {
    res.type('application/xhtml+xml');
    var data = [];
    db.each("SELECT Username, Text FROM Review WHERE Pubname = ? OR Pubname = ?", 'gallimaufry', 'Gallimaufry', function(err, row){
        data.push({name: row.Username, review: row.Text })
    });
    res.render('gallimaufry', {data});
});

app.get('/hydeco', function (req, res) {
    res.type('application/xhtml+xml');
    var data = [];
    db.each("SELECT Username, Text FROM Review WHERE Pubname = ? OR Pubname = ?", 'hydeco', 'Hydeco', function(err, row){
        data.push({name: row.Username, review: row.Text })
    });
    res.render('hydeco', {data});
});

app.get('/milkthistle', function (req, res) {
    res.type('application/xhtml+xml');
    var data = [];
    db.each("SELECT Username, Text FROM Review WHERE Pubname = ? OR Pubname = ?", 'milkthistle', 'Milkthistle', function(err, row){
        data.push({name: row.Username, review: row.Text })
    });
    res.render('milkthistle', {data});
});

app.get('/redlight', function (req, res) {
    res.type('application/xhtml+xml');
    var data = [];
    db.each("SELECT Username, Text FROM Review WHERE Pubname = ? OR Pubname = ?", 'Redlight', 'redlight', function(err, row){
        data.push({name: row.Username, review: row.Text })
    });
    res.render('redlight', {data});
});

app.post('/users/login', function(req, res, url){
  
       res.type('application/xhtml+xml');

       var sess = req.session;

        var username = req.body.Uname;
        var password = req.body.PName;

        var number = 0;
        db.each("SELECT COUNT(*) AS count FROM Person WHERE Username = ? AND Password = ?" , username, password, function(err, row){
            number = row.count;
       },
        function (){
            if(number == 1){
               sess.cookie.secure = true;
                res.render('review')
            }
            else{
                res.redirect('../register2.html')
            }
        })   

   });

app.post('/users/add', function(req, res, url){
       res.type('application/xhtml+xml');

        var sess = req.session; 

        var username = req.body.Uname;
        var password = req.body.PName;
        var email = req.body.EName;
        var number = 0;
        db.each("SELECT COUNT(*) AS count FROM Person WHERE Username = ?", username, function(err, row){
            number = row.count;
       },
        function (){
            if(number == 0){
                sess.cookie.secure = true;
                var stmt = db.prepare("INSERT INTO Person (Username, Password, Email) VALUES (?, ?, ?)");
                stmt.run(username, password, email);
                stmt.finalize(); 
                res.render('review')
            }
            else{
                res.redirect('../register2.html')
            }
        })   

   });

app.get('/review', function (req, res) {
    res.type('application/xhtml+xml');
    var sess = req.session;
    if (sess.cookie.secure == true) {
    res.render('review');
    }
    else{
        res.redirect('../register2.html');
    }
});

app.post('/users/review', function(req, res, url){
    res.type('application/xhtml+xml');  
	var sess = req.session;
    if (sess.cookie.secure == true) {
    var username = req.body.Uname;
    var pubname = req.body.Pname;
    var date = req.body.Dname;
    var text = req.body.Rname;

	var stmt = db.prepare("INSERT INTO Review (Username, Pubname, Date, Text) VALUES (?, ?, ?, ?)");
	stmt.run(username, pubname, date, text);
	stmt.finalize(); 

    res.redirect('../index.html');
    }
    else{
        res.redirect('../index.html');
    }
});

app.use(session({
  genid: function() {
    return genuuid() // use UUIDs for session IDs
  },
  secret: 'havingagoodtime'
}));



app.listen(3000, function(){
	console.log('server started on port 3000');
})