'use strict'

const jsdom = require('jsdom').jsdom;
const doc = jsdom();
const window = doc.defaultView;
const $ = require('jquery')(window);

module.exports.parseSimpleMovie = (selector, html) => {
    $('body').html(html);
    let items = [];
    $(selector).each((index, item) => {
        const $item = $(item);

        items.push({
            title: $item.html(),
            url: $item.attr('href')
        })
    })

    return Promise.resolve()
        .then(() => {
            return items;
        });
}

module.exports.parseMovieDetails = (selector, html) => {
    $('body').html(html);
    let items = [];
    $(selector).each((index, item) => {
        const $item = $(item);

        items.push({
            description: $item.find(".summary_text").html(),
            stars: $item.find(" span[itemprop='actors'] a").attr("href"),
            categories: $item.find("span[itemprop='genre']").html(),
            releaseDate: $item.find("a[title='See more release dates']").html(),
            title: $item.find("h1[itemprop='name']").text(),
            trailer: $item.find("a[itemprop='trailer']").attr("href"),
            cover: $item.find("img[itemprop='image']").attr("src")
        })
    })

    return Promise.resolve()
        .then(() => {
            return items;
        });
};
