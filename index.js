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

app.get("/api", (req, res) => {
  const date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.get("/api/:date_string", (req, res) => {
  const dateString = req.params.date_string;
  let date;
  date = isNaN(dateString) ? new Date(dateString) : new Date(parseInt(dateString));
  if(date.toString() === 'Invalid Date') {
    return res.json({error: 'Invalid Date'});
  }
  let unixDate = date.getTime();
  let utcDate = date.toUTCString();

  res.json({
    unix: unixDate,
    utc: utcDate
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
