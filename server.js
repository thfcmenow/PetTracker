// require('dotenv').config()
const fs = require('fs');
const express = require("express")
const router = express.Router()
const app = express()
const path = require('path');
const port = process.env.PORT || 3000;

/*process.env.CYCLIC_DB = 'zany-gold-armadillo-bootCyclicDB'
const CyclicDb = require("cyclic-dynamodb")
const db = CyclicDb("zany-gold-armadillo-bootCyclicDB")*/

const config = require("./json/config.json");

//setting view engine to ejs
app.set("view engine", "ejs");

var retData = ""

// retrieve data
const run = async function(){
 /* let pets = db.collection('Pets')
  let work = await pets.item('Yuki').fragment('visits').get()
  retData = JSON.stringify(work)*/
 //let item = await pets.get('Yuki')

  //retData = JSON.stringify(item)
 
  //let yuki = await pets.set(item.props.Dates[0].complete,"true")*/
}

//run()


// index
app.get('/', function (req, res) {
   res.render("index", {
    data: config
  });
});

// update
router.get("/update", (request, response) => {
  let json = request.query.main

  let updateDB = async function(){
  let pets = db.collection('Pets')
  await pets.item('Yuki')
        .fragment('visits').set({
            dates: request.query.main
        })
      }
  /*
  delete json['updated'];
  delete json['created']
  let serverdata = JSON.stringify(json);
  console.log(serverdata)
  let updateDB = async function(){
    let pets = db.collection('Pets')
    // let yuki = await pets.set('Yuki', serverdata)
    let yuki = await pets.set('Yuki',JSON.stringify(json))
    pets.set()
  } */
  updateDB()
})

app.get('/yuki.JPG', function (req, res) {
  res.sendFile(path.join(__dirname, '/yuki.JPG'))
})

app.use("/", router)

app.listen(port);

console.log('Server started at on port: ' + port);


