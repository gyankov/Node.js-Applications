'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SimpleMovieSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    imdbId: {
        type: String,
        required: true
    }
});

//  /title/tt0067992/?ref_=adv_li_tt
function extractImdbIdFromUrl(url) {
    let index = url.indexOf('/?ref');
    return url.substring('/title/'.length, index);
}

let SimpleMovie;
SimpleMovieSchema.statics.getSimpleMovieByNameAndUrl = function (name, url) {
    let imdbId = extractImdbIdFromUrl(url);
    return new SimpleMovie({ name, imdbId })
}

SimpleMovieSchema
.virtual('url')
.get( function() {
    return `http://imdb.com/title/${this.imdbId}/?ref_=adv_li_tt`;
});

mongoose.model('SimpleMovie', SimpleMovieSchema);
SimpleMovie = mongoose.model('SimpleMovie');
module.exports = SimpleMovie;