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

firebase.initializeApp(config);

app.set("port", process.env.PORT || 3000);
//to handle HTTP get request
app.get("/rates", function(req, res) {
  console.log("HTTP Get Request");
  res.send("HTTP GET Request");   

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