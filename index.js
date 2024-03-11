// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// function to check if input is numeric
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

//Mysolution
app.get("/api/:date?", (req,res) =>{

  var val = new Date(req.params.date);

  var input = new Date(val);
  var aunix; 
  var autc;
  if(val == undefined){ // empty input do now
    aunix = Date.now();
    autc = new Date(aunix).toUTCString();
    res.JSON({unix: aunix, utc: autc})
  }else if(!isNaN(input)){  // utc given
    autc = new Date(input).toUTCString();
    aunix = Date.parse(input);
    res.JSON({unix: aunix, utc: autc})
  }else if(isNumeric(val)){  // unix given
    aunix = val;
    autc = new Date(aunix*1000).toUTCString();
    res.JSON({unix: aunix, utc: autc})
  }
  else{  //trash input
    res.JSON({error: "Invalid Date"})
  }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
