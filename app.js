require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const reviews = require('./controllers/reviews');
const comments = require('./controllers/comments')
const movies = require('./controllers/movies')

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

movies(app);
reviews(app);
comments(app);


app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
})
