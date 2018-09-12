const Review = require('../model/review');

module.exports = function(app) {

    //GET: View reviews
    app.get('/admin', (req, res) => {
        Review.find()
        .then(reviews => {
            res.render('admin', { reviews: reviews });
        })
        .catch(error => {
            console.log(error);
        })
    })
    app.delete('/admin/reviews/:id', (req, res) => {
        Review.findByIdAndRemove(req.params.id)
        .then((review) => {
            res.status(200).send(review);
        }).catch(er => {
            res.status(400).send(err);
        });
    })
}
