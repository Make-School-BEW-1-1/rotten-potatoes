const Review = require('../model/review')
const Comment = require('../model/comment.js')

module.exports = function(app) {

    app.get('/', (req, res) => {
          Review.find()
          .then(rvws => {
              res.render('reviews-index', {reviews: rvws});
          }).catch(error => {
              console.log(error);
          });
      });

      app.get('/reviews/new', (req, res) => {
          res.render('reviews-new');
      });

      app.post('/reviews', (req, res) => {
          Review.create(req.body)
          .then(review => {
              res.redirect(`/reviews/${review._id}`);
          }).catch(error => {
              console.log(error.message);
          });
      });

      app.get('/reviews/:id', (req, res) => {
          Review.findById(req.params.id)
          .then(rvw => {
              Comment.find({ reviewId: req.params.id}).then(comments => {
                  res.render('reviews-show', {review: rvw, comments: comments });
              })

          }).catch(error => {
              console.log(error);
          });
      });

      app.get('/reviews/:id/edit', (req, res) => {
          Review.findById(req.params.id)
          .then(rvw => {
              res.render('reviews-edit', {review: rvw});
          }).catch(error => {
              console.log('Error');
          });
      });

      app.put('/reviews/:id', (req, res) => {
          Review.findByIdAndUpdate(req.params.id, req.body)
          .then(review => {
              res.redirect(`/reviews/${review._id}`);
          }).catch(error => {
              console.log(error);
          });
      });

      app.delete('/reviews/:id', (req, res) => {
          Review.findByIdAndRemove(req.params.id)
          .then(() => {
              res.redirect('/');
          });
      });

      app.post('/reviews/comments', (req, res) => {
          Comment.create(req.body).then(comment => {
              res.redirect(`/reviews/${comment.reviewId}`)
          }).catch((err) => {
              console.log(err.message)
          })
      })

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
