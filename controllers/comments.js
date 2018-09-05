const Comment = require('../model/comment.js')

module.exports = function(app) {

// POST: Create new comment
      app.post('/reviews/comments', (req, res) => {
          Comment.create(req.body).then(comment => {
              res.redirect(`/reviews/${comment.reviewId}`)
          }).catch((err) => {
              console.log(err.message)
          })
      })

// Delete a single comment
      app.delete('/reviews/comments/:id', function(req, res) {
          console.log("DELETE comment")
          Comment.findByIdAndRemove(req.params.id).then((comment) => {
              console.log(comment._reviewId);
              res.redirect(`/reviews/${comment.reviewId}`);
          }).catch((err) => {
              console.log(err.message);
          })
      })
  }
