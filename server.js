// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var date = new Date();
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  var parameter = req.params.date; // date parameter
  
  var parsedDate = Date.parse(parameter);
  var date = new Date(parsedDate); // date object
 
  console.log(parsedDate); // just checking!
 
  var json = {"unix":"","utc": ""}; // global object
 
  if(isNaN(parsedDate)){ // Invalid Date
    json.unix = null;
    json.utc = "Invalid Date";
  
    
  }else{
   
    json.unix = parsedDate / 1000;
    json.utc = date.toUTCString();
  
    
  }
  
  res.json(json);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});