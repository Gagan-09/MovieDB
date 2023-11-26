const express = require('express')
const mongoose = require('mongoose')
const { render } = require('ejs')

const userRouter = require("./routes/userRoutes")
const directorRouter = require("./routes/directorRoutes")
const movieRouter = require("./routes/movieRoutes")
const ratingRouter = require("./routes/ratingRoutes")
const reviewRouter = require("./routes/reviewRoutes")

const app = express()

//view engine
app.set('view engine', 'ejs')

//middleware and static
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

const uri = "mongodb+srv://generic_user:gL5nSaycAzXKNaBf@cluster0.ftxrjk8.mongodb.net/movieDB?retryWrites=true&w=majority"

mongoose.connect(uri)
.then((result) => app.listen(8080, () => {
    console.log('server is running')}))
.catch((err) => console.log(err))

app.get("/", (req, res) => {
/*     const movies = [
         {title: 'Interstellar', voteAvg: '56789'},
        {title: 'The dark knight', voteAvg: '89088'},
        {title: 'Batman', voteAvg: '102029'} 
    ] 
    res.render('index', {title: 'Home', movies}) */
    res.redirect("/movies")
})

app.use("/users", userRouter)
app.use("/directors", directorRouter)
app.use("/movies", movieRouter)
app.use("/ratings", ratingRouter)
app.use("/reviews", reviewRouter)

app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})

