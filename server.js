// require('dotenv').config()
const fs = require('fs');
const express = require("express")
const router = express.Router()
const app = express()
const path = require('path');
const port = process.env.PORT || 3000;



const config = require("./json/config.json");

//setting view engine to ejs
app.set("view engine", "ejs");

// index
app.get('/', function (req, res) {
   res.render("index", {
    data: config
  });
});

// change ignored dates
app.get('/admin/:dates', function (req, res) {
  let dates = req.params.dates

  if (dates == "read"){
  fs.readFile('ignoredDates.txt', 'utf8', function(err, data){
    res.send(data);
})
  } else if (dates == "blank") {

    
  
      fs.writeFile("ignoredDates.txt", dates, 'utf8', function (err) {
         
    });
    res.send("OK")
      } else {
  
  fs.writeFile("ignoredDates.txt", dates, 'utf8', function (err) {
    
});
res.send("OK")
  }
});

app.get('/yuki.JPG', function (req, res) {
  res.sendFile(path.join(__dirname, '/yuki.JPG'))
})

app.use("/", router)

app.listen(port);




