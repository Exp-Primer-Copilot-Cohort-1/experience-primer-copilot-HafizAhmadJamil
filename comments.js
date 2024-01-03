// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.get('/comments.html', function (req, res) {
   res.sendFile( __dirname + "/" + "comments.html" );
})

app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   var comment = {
       name:req.body.name,
       comment:req.body.comment
   };
   console.log(comment);
   fs.readFile('comments.json', function (err, data) {
       var json = JSON.parse(data);
       json.push(comment);
       fs.writeFile("comments.json", JSON.stringify(json));
   });
   res.end(JSON.stringify(comment));
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
})