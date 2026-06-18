const mongoose = require("mongoose");
const Listing  = require("../models/listing.js");
const initData = require("./data.js");

let mongoURL =   'mongodb://127.0.0.1:27017/wanderlist';
async function main(){
    await mongoose.connect(mongoURL);
}
main().then(()=>console.log("Db connected"))
.catch(()=>console.log("something Error"));

async function initDB(){
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner:"6a2aca6968d83e369ab04bf3"}));
    await Listing.insertMany(initData.data);
    console.log("data initialized");
}
initDB();