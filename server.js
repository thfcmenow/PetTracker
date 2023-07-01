const express = require("express")
const router = express.Router()
const app = express()
require('dotenv').config();
const port = process.env.PORT || 3000;

const CyclicDb = require("@cyclic.sh/dynamodb")
const db = CyclicDb(process.env.DB_NAME)
const visits = db.collection(process.env.DB_COLLECTION)



// dynamo section ---------------------------
// retreive specific record number or index from dynamo
async function getDynamo(recordNum) {
  let item = await visits.get(recordNum);
  return item;
}

// prepare for data retrieval 
async function visualizeDynamo(res,recordNum) {
  let result = await getDynamo(recordNum);
  res.json(result.props.data)
}

// route for data retrieval
app.get('/getDetails', function(req, res){
  // specific record
  if (req.query.name.length == 2) visualizeDynamo(res,req.query.name)
  
  // index
  if (req.query.name == "getIndex") {
    visualizeDynamo(res,"index")
  }
})
// end dynamo -----------------------------


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

// editor
app.get('/editor', function (req, res) {
  res.render("editor", {
   data: config
 });
});

// JSON
app.use('/json', express.static('json'))

// CSS, images, public resources
app.use('/public', express.static('public'))

app.use("/", router)

app.listen(port);