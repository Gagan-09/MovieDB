const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")

router.get("/", userController.user_get)
router.get("/create", userController.user_create_get)
router.post("/create", userController.user_create_post) 

module.exports = router