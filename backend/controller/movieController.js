const movies = require("../models/movieModel")
const directors = require("../models/directorModel")
const movies_get =  (req, res) => {
    movies.find()
    .then((result) => {
        res.render('index', {title: 'Home', movies: result})
    }).catch((err) => {
        console.log(err)
    }) 

}

const movie_by_id =  (req, res) => {
    const movieId = req.params.id
    /* const getDirectorInfoForMovie = (movieId) => {
        return */ 
        const director = movies.aggregate([
          {
            $match: { _id: movieId } // Match the desired movie_id
          },
          {
            $lookup: {
              from: "directors",
              localField: "director_id",
              foreignField: "_id",
              as: "director"
            }
          },
          {
            $unwind: "$director"
          },
          {
            $project: {
              _id: 0,
              movie_title: "$title",
              director_name: "$director.name",
              director_DOB: "$director.DOB"
              // Add other fields from the "directors" collection as needed
            }
          }
        ])
      //};
      

      //const pipeline = getDirectorInfoForMovie(movieId);
      console.log(director)
      // Now, you can use this 'pipeline' in your MongoDB aggregation query
      
    movies.findById(movieId)
    .then((result) => {
        res.render('MovieDetails', {movie: result, title: 'Movie Details'})
    }).catch((err) => {
        console.log(err)
    }) 
}
//const movieId = 1; // Replace with the desired movie_id




module.exports = {
    movies_get,
    movie_by_id
}