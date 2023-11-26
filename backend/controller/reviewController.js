const reviews = require("../models/reviewModel")

const reviews_get = (req, res) => {
    reviews.find()
    .then((result) => {
        res.render('Review', {title: "Reviews", reviews: result})
    }).catch((err) => {
        console.log(err)
    })
}
const reviews_create_get = (req, res) => {
    res.render('createReview', {title: "New Review"})
}
module.exports = {
    reviews_get,
    reviews_create_get
}