const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', {useNewUrlParser: true});

module.exports = mongoose.model('Review', {
    title: String,
    movieTitle: String,
    description: String
});
