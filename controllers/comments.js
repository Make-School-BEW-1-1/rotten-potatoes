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
          // console.log("DELETE comment")
          Comment.findByIdAndRemove(req.params.id).then((comment) => {
              res.status(200).send(comment);
          }).catch((err) => {
              res.status(400).send(err)
          })
      })
  }
