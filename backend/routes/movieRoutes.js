const express = require("express")
const router = express.Router()
const movieController = require("../controller/movieController")

router.get("/", movieController.movies_get)
router.get("/:id", movieController.movie_by_id)
//router.get('/:id/reviews', movieController.movie_reviews)
module.exports = router