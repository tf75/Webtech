var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('example.db');

app.use(express.static(path.join(__dirname, 'public')));

app.post('/users/add', function(req, res, url){
	console.log(req.url);
   res.type('application/xhtml+xml');
    req.on('data', add);
    req.on('end', end);
    var body = "";
    function add(chunk) {
        body = body + chunk.toString();
    }
    function end() {
    	console.log(body);    
	    var personData = new Array();
	    personData = body.split("&");

	    var temp = "";
	    for (var i = 0; i<3; i++){
	    	temp = personData[i];
	    	temp = temp.slice(6);
	    	personData[i] = temp;

	    }
	        console.log(personData[0]); 
	        console.log(personData[1]); 
	        console.log(personData[2]); 

	        var stmt = db.prepare("INSERT INTO Person (Username, Password, Email) VALUES (?, ?, ?)");
	        stmt.run(personData[0], personData[1], personData[2]);
	        stmt.finalize(); 


    }


  // db.run("INSERT INTO Person (Username, Password, Email) VALUES (?, ?, ?)", );

   //var info = req.body
   //db.each("SELECT Username, Email, Password FROM Person",function(err,row)
   //{
  //console.log("example.Username"+row.Username, row.Email); 
   //});
   });

app.listen(3000, function(){
	console.log('server started on port 3000');
})