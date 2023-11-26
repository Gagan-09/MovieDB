const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    user_id: Number,
    user_name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    gender:{
        type: String,
        required: true
    }
})

const user = mongoose.model("user", userSchema)

module.exports = user