const mongoose = require("mongoose")
const { Decimal128 } = require("mongodb")

const ratingSchema = new mongoose.Schema({
    rating_id: {
        type:Number,
        required: true
    },
    user_id:{
        type: Number,
        required: true
    },
    movie_id:{
        type: Number,
        required: true
    },
    rating:{
        type: Decimal128,
        required: true
    },
    timestamp:{
        type: Date
    }
})

const rating = mongoose.model("rating", ratingSchema)
module.exports = rating