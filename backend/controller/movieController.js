const movies = require("../models/movieModel")

const movies_get =  (req, res) => {
    movies.find()
    .then((result) => {
        res.render('index', {title: 'Home', movies: result})
    }).catch((err) => {
        console.log(err)
    }) 

}

const movie_by_id = async (req, res) => {
    try{
        const movie = await movies.findById(req.params.id)
        res.json({movie})
    }
    catch{
        console.log(`Error: ${error.message}`)
        res.status(404).send('Movie not found')
    }
}

module.exports = {
    movies_get,
    movie_by_id
}