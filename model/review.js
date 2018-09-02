const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', {useNewUrlParser: true});

module.exports = mongoose.model('Review', {
    title: String,
    movieTitle: String,
    description: String
});
// this is a comment
