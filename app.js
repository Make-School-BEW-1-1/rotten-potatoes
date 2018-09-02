const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const controller = require('./controllers/controller');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

controller(app);

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})
