const express = require("express")
const router = express.Router()
const reviewController = require("../controller/reviewController")

router.get("/", reviewController.reviews_get)
router.get("/create", reviewController.reviews_create_get)
module.exports = router