'use strict'

const httpRequester = require('./utils/http-requester');
const htmlParser = require('./utils/html-parser');
const queuesFactory = require('./data-structures/queue');
const modelsFactory = require('./models');
const constants = require('./config/constants');
const repository = require('./utils/films-repository');

require('./config/mongoose')(constants.connectionString);

let urlsQueue = queuesFactory.getQueue();

function wait(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

constants.genres.forEach(genre => {
    for (let i = 0; i < constants.pagesCount; i += 1) {
        let url = `http://www.imdb.com/search/title?genres=${genre}&title_type=feature&0sort=moviemeter,asc&page=${i + 1}&view=simple&ref_=adv_nxt`;
        urlsQueue.push(url);
    }
});

function getMoviesFromUrl(url) {
    console.log(`Working with ${url}`);
    httpRequester.get(url)
        .then((result) => {
            const selector = '.col-title span[title] a';
            const html = result.body;
            return htmlParser.parseSimpleMovie(selector, html);
        })
        .then((movies) => {
            let dbMovies = movies.map(movie => {
                return modelsFactory.getSimpleMovie(movie.title, movie.url);
            });

            modelsFactory.insertManySimpleMovies(dbMovies);

            return wait(1000);
        })
        .then(() => {
            if (urlsQueue.isEmpty()) {
                return
            }

            getMoviesFromUrl(urlsQueue.pop());
        })
        .catch((err) => {
            console.dir(err)
        });
}

const asyncPagesCount = 15;

// for(let i = 0; i< asyncPagesCount; i+=1){
//     getMoviesFromUrl(urlsQueue.pop());
// }

let detailUrls;

function getMoviesDetails(url) {
    console.log(`Working with ${url}`);
    httpRequester.get(url)
        .then((result) => {
            const selector = '#main_top';
            const html = result.body;
            return htmlParser.parseMovieDetails(selector, html);
        })
        .then((movie) => {
            let dbMovie = 
                 modelsFactory.getDetailedMovie(movie.description,
                 movie.stars,
                 movie.categories,
                 movie.releaseDate,
                 movie.title,
                 movie.trailer,
                 movie.cover);
          

            modelsFactory.insertDetailedMovie(dbMovie);

            return wait(1000);
        })
        .then(() => {
            if (detailUrls.length === 0) {
                return
            }

            getMoviesFromUrl(detailUrls.pop());
        })
        .catch((err) => {
            console.dir(err)
        });

}


repository.getMovies()
    .then(movies => {
        var urls = movies.map(movie => {
            console.log(movie)
            return movie.url;
        });
        return urls;
    })
    .then(urls => {
        detailUrls = urls;
        for (var i = 0; i < asyncPagesCount; i += 1) {
            getMoviesDetails(detailUrls.pop())
        }
    })
