const Comment = require('../model/comment.js')

module.exports = function(app) {

// POST: Create new comment
      app.post('/reviews/comments', (req, res) => {
          console.log(req);
          // Comment.create(req.body).then(comment => {
          //     res.status(200).send({ comment: comment });
          // }).catch((err) => {
          //     res.status(400).send({ err: err })
          //     console.log("Could not create new comment");
          // })
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
