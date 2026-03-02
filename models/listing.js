const mongoose = require("mongoose");
const schema = mongoose.Schema;
const reviews = require("./reviews.js");
const user = require("./user.js")

let listing_schema = new schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    image : {
        url : String,
        filename : String
    },
    price : {
        type : Number
    },
    location : {
        type : String
    },
    country : {
        type : String
    },
    reviews : [
        {
            type : schema.Types.ObjectId,
            ref : "reviews"
        }
    ],
    owner : {
        type : schema.Types.ObjectId,
        ref : "user" 
    },
    geometry : {
        type : {
            type : String,
            enum : ["Point"],
            required : true
        },
        coordinates : {
            type : [Number],
            required : true
        }
    }
})

listing_schema.post("findOneAndDelete", async(listing) => {
    if(listing) {
        await reviews.deleteMany({_id : {$in : listing.reviews}});
    }
})
const listing = mongoose.model("listing", listing_schema)
module.exports = listing