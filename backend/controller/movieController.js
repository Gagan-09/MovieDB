const movies = require("../models/movieModel")
const directors = require("../models/directorModel")
const mongoose = require('mongoose')
const ratings = require('../models/ratingModel')
const movies_get = (req, res) => {
  movies.find()
    .then((result) => {
      res.render('index', { title: 'Home', movies: result })
    }).catch((err) => {
      console.log(err)
    })

}

const movie_by_id = (req, res) => {
  const movieId = req.params.id;

  const movieQuery = movies.findById(movieId).exec();

  const directorQuery = movies.aggregate([
    {
      $match: { _id: movieId }
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
  ]).exec();
  Promise.all([movieQuery, directorQuery])
    .then(([movieResult, directorResult]) => {
      console.log(directorQuery.director_name)
      res.render('MovieDetails', { movie: movieResult, director: directorResult, title: 'Movie Details' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
};
//const movieId = 1; // Replace with the desired movie_id


const movie_reviews = (req, res) => {
  const movieId = req.params.id
  const reviewQuery = ratings.aggregate([
    // Match ratings for a specific movie_id (assuming movie_id is linked between ratings and movies)
    {
      $match: {
        movie_id: movieId // Replace 11 with the desired movie_id
      }
    },
    // Lookup to join ratings with users collection to get user details
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "user_id",
        as: "user"
      }
    },
    // Unwind the user array created from the lookup
    {
      $unwind: "$user"
    },
    // Lookup to join with reviews collection to get review_text if available
    {
      $lookup: {
        from: "reviews",
        localField: "rating_id",
        foreignField: "rating_id",
        as: "review"
      }
    },
    // Project to shape the output
    {
      $project: {
        _id: 0,
        "User Name": "$user.user_name",
        Rating: "$rating",
        Reviews: {
          $cond: {
            if: { $eq: [{ $size: "$review" }, 0] },
            then: ["No review available"],
            else: "$review.review_text"
          }
        }
      }
    }
  ]).then((result) => {

  }).catch({

  })
  console.log(reviewQuery.Reviews)
}

module.exports = {
  movies_get,
  movie_by_id
}