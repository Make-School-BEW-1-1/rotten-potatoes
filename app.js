const express = require('express')
const app = express()

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes');

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

let reviews = [
    { title: "Great Review" },
    { title: "Next Review" }
]

const Review = mongoose.model('Review', {
    title: String
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
