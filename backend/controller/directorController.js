const directors = require("../models/directorModel")

const directors_get = (req, res) => {
    directors.find()
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    }) 
}

module.exports = {
    directors_get
}