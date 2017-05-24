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

app.get('/brasspig', function (req, res) {
    res.render('brasspig');
});

app.post('/users/add', function(req, res, url){
   res.type('application/xhtml+xml');
    req.on('data', add);
    req.on('end', end);
    var body = "";
    function add(chunk) {
        body = body + chunk.toString();
    }
    function end() {    
	    var personData = new Array();
	    personData = body.split("&");

	    var temp = "";
	    for (var i = 0; i<3; i++){
	    	temp = personData[i];
	    	temp = temp.slice(6);
	    	personData[i] = temp;

	    }

	        var stmt = db.prepare("INSERT INTO Person (Username, Password, Email) VALUES (?, ?, ?)");
	        stmt.run(personData[0], personData[1], personData[2]);
	        stmt.finalize(); 
    }

    res.redirect('../review.html')

   });

app.post('/users/review', function(req, res, url){
    res.type('application/xhtml+xml');
    req.on('data', add);
    req.on('end', end);
    var body = "";
    function add(chunk) {
        body = body + chunk.toString();
    }
    function end() {   
	    var personData = new Array();
	    personData = body.split("&");

	    var temp = "";
	    for (var i = 0; i<4; i++){
	    	temp = personData[i];
	    	temp = temp.slice(6);
	    	personData[i] = temp;

	    }
            console.log(personData[0]);
            console.log(personData[1]);
            console.log(personData[2]);
            console.log(personData[3]);

	        var stmt = db.prepare("INSERT INTO Review (Username, Pubname, Date, Text) VALUES (?, ?, ?, ?)");
	        stmt.run(personData[0], personData[1], personData[2], personData[3]);
	        stmt.finalize(); 
    }

    res.redirect('../index.html')

   });

app.listen(3000, function(){
	console.log('server started on port 3000');
})