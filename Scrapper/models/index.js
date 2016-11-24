const SimpleMovie = require('./simple-movie-model');
const DetailedMovie = require('./detail-movie-model');

module.exports = {
    getSimpleMovie(name, url) {
        return SimpleMovie.getSimpleMovieByNameAndUrl(name, url);
    },
    insertManySimpleMovies(movies) {
        SimpleMovie.insertMany(movies);
    },
    insertDetailedMovie(movies) {
        DetailedMovie.insertMany(movies);
    },
    getDetailedMovie(description, stars, categories, releaseDate, title, trailer, cover) {
        return DetailedMovie.getDetailedMovie(description, stars, categories, releaseDate, title, trailer, cover)
    }
}