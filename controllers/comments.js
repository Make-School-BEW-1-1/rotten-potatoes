const Comment = require('../model/comment.js')
const Review = require('../model/review.js')

module.exports = function(app) {

// POST: Create new comment
      app.post('/reviews/:reviewId/comments', (req, res) => {
          Comment.create(req.body).then(comment => {
              res.status(200).send({ comment: comment });
          }).catch((err) => {
              res.status(400).send({ err: err })
              console.log("Could not create new comment");
          })
      })

// Delete a single comment
      app.delete('/reviews/:reviewId/comments/:id', function(req, res) {
          console.log("DELETE comment")
          const review = Review.findById(req.params.reviewID);
          Comment.findByIdAndRemove(req.params.id).then((comment) => {
              console.log(comment._reviewId);
              res.redirect(`/movies/${review.movieId}/reviews/${comment.reviewId}`);
          }).catch((err) => {
              console.log(err.message);
          })
      })
  }
