var express = require('express'); //import express 
var app = express();

app.set('port', process.env.PORT || 3000);

//to handle HTTP get request
app.get('/', function (req, res) {
  console.log("Get Request");
  res.send("Get Request");
});

app.listen(app.get('port'), (err) => {
  if (err) {
      return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${app.get('port')}`);
});
