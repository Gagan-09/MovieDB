const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    rating_id: {
        type: Number,
        //required: true
    },
    review_text: {
        type: String
    }
    
}, {
    timestamps: true
})

const review = mongoose.model("review", reviewSchema)

module.exports = review