const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const userRouter = require('./routes/userRoutes');
const directorRouter = require('./routes/directorRoutes');
const movieRouter = require('./routes/movieRoutes');
const ratingRouter = require('./routes/ratingRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const users = require('./models/userModel');

const app = express();

// view engine
app.set('view engine', 'ejs');

// middleware and static
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: uuidv4(), // Use a static secret for production
    resave: false,
    saveUninitialized: true,
  })
);

const uri =
  'mongodb+srv://generic_user:gL5nSaycAzXKNaBf@cluster0.ftxrjk8.mongodb.net/movieDB?retryWrites=true&w=majority';

mongoose
  .connect(uri)
  .then(() => app.listen(8080, () => console.log(`Server is running on port 8080`)))
  .catch((err) => console.error(err));


app.get('/', (req, res) => {
  res.render('login');
});

app.post('/login',  (req, res) => {
  const { username, password } = req.body;
    const user =  users.findOne({ user_name:username });
    user.then((result) => {
      if(result.user_name == username && (result.password == password)){
        req.session.userId = result._id
        req.session.userName = result.user_name
        res.redirect("/movies")
      }
      else{
        res.render('login', { error: 'try again' })
      }
    }).catch((err) => {
      console.log(err)
      res.end("an error occured")
    })

});

// Logout ---- destroy the session
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.render('login', { msg: "Logout Successful", error: ""});
  });
});

// Routers
app.use('/users', userRouter);
app.use('/directors', directorRouter);
app.use('/movies', movieRouter);
app.use('/ratings', ratingRouter);
app.use('/reviews', reviewRouter);

app.get('/about-us', (req, res) => {
  res.render('about-us', { title: 'About' });
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
  