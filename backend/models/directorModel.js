const mongoose = require('mongoose')

const directorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    DOB: {
        type: String,
        required: true
    },
    movie_id:{
        type: Number,
        required: true
    }
})

const director = mongoose.model("director", directorSchema)

module.exports = director