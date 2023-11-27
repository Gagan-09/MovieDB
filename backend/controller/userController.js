const User = require("../models/userModel")

const user_get = (req, res) => {
    User.find()
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    })
}  
const user_create_get = (req, res) => {
    res.render('createUser', {title: "New User"})
}

const user_create_post = async (req, res) => {
    console.log(req.body)
    const user = await new User(req.body)
    user.save()
  /*   .then((result) => {
        res.redirect("/")
    }).catch((err) => {
        console.log(err)
    }) */
}

module.exports = {
    user_get,
    user_create_get,
    user_create_post
}