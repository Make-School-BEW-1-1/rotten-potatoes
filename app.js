const express = require('express')
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

const methodOverride = require('method-override');
app.use(methodOverride('_method'))

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
         res.redirect(`/reviews/${review._id}`)
     }).catch((err) => {
         console.log(err.message);
     })
 });

 app.get('/reviews/:id', (req, res) => {
     Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review: review})
}).catch((err) => {
    console.log(err.message);
})
 });

 app.get('/reviews/:id/edit', function (req, res) {
  Review.findById(req.params.id, function(err, review) {
    res.render('reviews-edit', {review: review});
  })
});

// UPDATE
app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})

// DELETE
app.delete('/reviews/:id', function (req, res) {
    console.log("DELETE review")
    Review.findByIdAndRemove(req.params.id).then((review) => {
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    })
})
