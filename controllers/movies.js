const api_key = process.env.APIKEY;

const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb(api_key)

module.exports = function(app) {
    app.get('/', (req, res) => {
        moviedb.miscNowPlayingMovies().then(response => {
            res.render('movies-index', { movies: response.results });
        }).catch(console.error)
        // console.log(api_key);
    })

    app.get('/movies/:id', (req, res) => {
        moviedb.movieInfo({ id: req.params.id}).then(movie => {
            if (movie.video) {
                moviedb.movieVideos({ id: req.params.id }).then(videos => {
                    movie.trailer_youtube_id = videos.results[0].api_key
                    renderTemplate(movie)
                })
            } else {
                renderTemplate(movie)
            }

            function renderTemplate(movie) {
                res.render('movies-show', { movie: movie});
            }
        }).catch(console.error)
    })

}
