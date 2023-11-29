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
const reviews_create_post = (req, res) => {
    console.log(req.body)
    const review = new reviews(req.body)
    review.save()
    .then((result) => {
        res.redirect('/reviews')
    })
    .catch((err) => {
        console.log(err)
    })
}
module.exports = {
    reviews_get,
    reviews_create_get,
    reviews_create_post
}