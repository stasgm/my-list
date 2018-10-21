var express = require("express");
const bodyParser = require('body-parser');
const compression = require('compression');
var firebase = require("firebase");
// 
var config = require("./firebase");
var scrapeSelectBy = require("./rateScape");

var app = express();

app.use(bodyParser.json());
app.use(compression());
app.use('/.netlify/functions/server');

firebase.initializeApp(config);

app.set("port", process.env.PORT || 3000);
//to handle HTTP get request
app.get("/rates", function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
  
  scrapeSelectBy().then(list => {
    console.log("done!");
    
    saveToDatabase(list);     
  });
});

app.listen(app.get("port"), err => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`server is listening on ${app.get("port")}`);
});


function saveToDatabase(data) {
  console.log('saving..');
  //Insert key,value pair to database
  firebase
    .database()
    .ref("/CurrencyRate")
    .set(data);
}