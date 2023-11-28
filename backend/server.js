const express = require('express')
const mongoose = require('mongoose')
const { render } = require('ejs')
const session = require('express-session')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require("uuid")
const userRouter = require("./routes/userRoutes")
const directorRouter = require("./routes/directorRoutes")
const movieRouter = require("./routes/movieRoutes")
const ratingRouter = require("./routes/ratingRoutes")
const reviewRouter = require("./routes/reviewRoutes")
const users = require('./models/userModel')

const app = express()

//view engine
app.set('view engine', 'ejs')

//middleware and static
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}))

const uri = "mongodb+srv://generic_user:gL5nSaycAzXKNaBf@cluster0.ftxrjk8.mongodb.net/movieDB?retryWrites=true&w=majority"

mongoose.connect(uri)
.then((result) => app.listen(8080, () => {
    console.log('server is running')}))
.catch((err) => console.log(err))

app.get("/", (req, res) => {
        res.render('login')
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await users.findOne({ username });
  
      if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user._id;
        req.session.username = user.user_name;
        res.redirect('/');
      } else {
        res.redirect('/movies');
      }
    } catch (error) {
      console.error(error);
      res.redirect('/login');
    }
  });
  
  // Logout
  app.get('/logout', (req, res) => {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  });
  

//app.use('/logRoute', loginRouter)
app.use("/users", userRouter)
app.use("/directors", directorRouter)
app.use("/movies", movieRouter)
app.use("/ratings", ratingRouter)
app.use("/reviews", reviewRouter)

app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})

