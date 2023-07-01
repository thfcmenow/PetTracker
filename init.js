require('dotenv').config();
const dbName = process.env.DB_NAME;
const dbCollection = process.env.DB_COLLECTION;

const CyclicDb = require("@cyclic.sh/dynamodb")
const db = CyclicDb(dbName)
const visits = db.collection(dbCollection)

// setup primary index
const setupIndex = async function () {
    let visit = await visits.set("index", {
        data: [
            {
                id: "01",
                range: "2022-09-27 to 2022-11-15",
                received: 580,
                visits: 29,
                rate: 20
            },
            {
                id: "02",
                range: "2022-12-20 to 2023-01-31",
                received: 260,
                visits: 13,
                rate: 20
            },
            {
                id: "07",
                range: "2023-05-01 to 2023-06-01",
                received: 360,
                visits: 18,
                rate: 20
            }
        ]
    })
}

// set up specific record
const setup = async function () {
    let visit = await visits.set("07", {
        data: [
            {
                entry: "05/01/2023",
                duration: 1,
                notes: ""
            },
            {
                entry: "05/02/2023",
                duration: 1,
                notes: ""
            },
            {
                entry: "05/03/2023",
                duration: 1,
                notes: ""
            },
            {
                entry: "05/04/2023",
                duration: 1,
                notes: ""
            },
            {
                entry: "05/08/2023",
                duration: 1,
                notes: ""
            },
            {
                entry: "05/09/2023",
                duration: 1,
                notes: ""
            },
            {
                entry: "05/11/2023",
                duration: 1,
                notes: ""
            },
            {
                entry: "05/15/2023",
                duration: 1,
                notes: ""
            },
            {
                entry: "05/16/2023",
                duration: 1,
                notes: ""
            },
            {
                entry: "05/17/2023",
                duration: 1,
                notes: ""
            },
            {
                entry: "05/18/2023",
                duration: 1,
                notes: ""
            },
            {
                entry: "05/22/2023",
                duration: 1,
                notes: ""
            },
            {
                entry: "05/23/2023",
                duration: 1,
                notes: ""
            },
            {
                entry: "05/24/2023",
                duration: 1,
                notes: ""
            },
            {
                entry: "05/25/2023",
                duration: 1,
                notes: ""
            },
            {
                entry: "05/30/2023",
                duration: 1,
                notes: ""
            },
            {
                entry: "05/31/2023",
                duration: 1,
                notes: ""
            },
            {
                entry: "06/01/2023",
                duration: 1,
                notes: ""
            }
        ]
    })
}


// view test
async function ret() {
    let item = await visits.get("07");
    return item;
}

async function logData() {
    let result = await ret();
    console.log(result.props.data);
}

setupIndex()
// control
// setup()
 // logData();