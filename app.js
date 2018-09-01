const express = require('express')
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
});

app.get('/', (req, res) => {
    Review.find()
    .then(reviews => {
        res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
        console.log(err);
    })
})

app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {})
 })

 app.post('/reviews', (req, res) => {
     Review.create(req.body).then((review) => {
         console.log(review);
         res.redirect('/');
     }).catch((err) => {
         console.log(err.message);
     })
 })
