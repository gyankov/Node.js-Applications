"use strict";

const mongoose = require("mongoose");

module.exports.getMovies = () => {

    let promise = new Promise((resolve, reject) => {

        mongoose.model("SimpleMovie")
            .where({})
            .exec((err, data) => {
                if (err) {
                    reject(err);
                }
                let d = data;
                resolve(data);
            });
    });
    return promise;
};