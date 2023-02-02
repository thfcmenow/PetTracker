const express = require("express")
const router = express.Router()
const app = express()
const port = process.env.PORT || 3000;

// const config = require("./json/config.json"); // if use for scriptlets
const config = {}

//setting view engine to ejs
app.set("view engine", "ejs");

// index
app.get('/', function (req, res) {
   res.render("index", {
    data: config
  });
});

// JSON
app.use('/json', express.static('json'))

// CSS, images, public resources
app.use('/public', express.static('public'))

app.use("/", router)

app.listen(port);