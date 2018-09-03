const mongoose = require('mongoose');
const Schema = mongoose.Schema

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', {useNewUrlParser: true});

module.exports = mongoose.model('Comment', {
    title: String,
    content: String,
    reviewId: { type: Schema.Types.ObjectId, ref: 'Review'}
});
