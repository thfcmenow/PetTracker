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

var retData = ""

// index
app.get('/', function (req, res) {
   res.render("index", {
    data: config
  });
});

// update
router.get("/update", (request, response) => {
  let json = request.query.main
  let serverdata = JSON.stringify(json);
  response.write(serverdata)
  response.send()
  fs.writeFileSync('./json/config.json', serverdata);
})

app.get('/yuki.JPG', function (req, res) {
  res.sendFile(path.join(__dirname, '/yuki.JPG'))
})

app.use("/", router)

app.listen(port);

console.log('Server started at on port: ' + port);


