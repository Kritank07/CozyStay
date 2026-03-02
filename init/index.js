const mongoose = require("mongoose")
const initData = require("./data.js")
const listing = require("../models/listing.js")
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/cozystay")
}
main().then(res => {
    console.log("Connection Successfull")
})
.catch(err => console.log(err))

const initDB = async () => {
    try {
        await listing.deleteMany({})
        initData.data = initData.data.map((obj) => ({...obj, owner : "698b36954e9f679ca67d7f36"}))
        await listing.insertMany(initData.data)
        console.log("Database Initialized")
    } catch (error) {
        console.log("Error in DB Initialization", error)
    }
}
initDB()