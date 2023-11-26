const express = require("express")
const router = express.Router()
const ratingController = require("../controller/ratingController")

router.get("/", ratingController.ratings_get)

module.exports = router