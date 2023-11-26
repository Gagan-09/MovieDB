const express = require("express")
const router = express.Router()
const directorController = require("../controller/directorController")

router.get("/", directorController.directors_get)

module.exports = router