'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// description: $item.find(".summary_text").html(),
// stars: $item.find(" span[itemprop='actors'] a").attr("href"),
// categories: $item.find("span[itemprop='genre']").html(),
// releaseDate: $item.find("a[title='See more release dates']"),
// title: $item.find("h1[itemprop='name']").text(),
// trailer: $item.find("a[itemprop='trailer']").attr("href"),
// cover: $item.find("img[itemprop='image']").attr("src")

let DetailMovieSchema = new Schema({
    description: {
        type: String,
        required: true
    },

    stars: {
        type: [],
        required: true
    },
    categories: {
        type: []
    },
    releaseDate: {
        type: String
    },
    title: {
        type: String
    },
    trailer: {
        type:String
    },
    cover:{
        type:String
    }
});
let detailedMovie;
DetailMovieSchema.statics.getDetailedMovie = function (description, stars,categories,releaseDate,title,trailer,cover) {    
    return new detailedMovie({description, stars,categories,releaseDate,title,trailer,cover })
}

mongoose.model('DetailedMovie',DetailMovieSchema);
detailedMovie = mongoose.model('DetailedMovie');
module.exports = detailedMovie;