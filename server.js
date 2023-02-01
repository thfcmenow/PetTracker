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

// index router
app.get('/', function (req, res) {
   res.render("index", {
    data: config
  });
});

// image of the great Yuki and co
app.get('/yuki.JPG', function (req, res) {
  res.sendFile(path.join(__dirname, '/yuki.JPG'))
})

app.use("/", router)

app.listen(port);




