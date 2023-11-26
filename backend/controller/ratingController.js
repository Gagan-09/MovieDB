const ratings = require("../models/ratingModel")

const ratings_get = (req, res) => {
    ratings.find()
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = {
    ratings_get
}