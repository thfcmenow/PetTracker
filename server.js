const express = require("express")
const router = express.Router()
const app = express()
const port = process.env.PORT || 3000;

const CyclicDb = require("@cyclic.sh/dynamodb")
const db = CyclicDb(process.env.DB_NAME)
const visits = db.collection(process.env.DB_COLLECTION)

// dynamo section ---------------------------
// retreive specific record number from dynamo
async function getDynamo(recordNum) {
  let item = await visits.get(recordNum);
  return item;
}

async function visualizeDynamo(res,recordNum) {
  let result = await getDynamo(recordNum);
  res.json(result.props.data)
}

app.get('/getDetails', function(req, res){
  if (req.query.name.length == 2) visualizeDynamo(res,req.query.name)
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

// JSON
app.use('/json', express.static('json'))

// CSS, images, public resources
app.use('/public', express.static('public'))

app.use("/", router)

app.listen(port);