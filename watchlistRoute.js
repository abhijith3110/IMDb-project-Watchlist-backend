const express = require('express');
const {getMovie,createMovie,deleteMovieData} = require('./controller');


const Router = express.Router();

Router.route("/").get(getMovie);
Router.route("/").post(createMovie);
Router.route("/:id").delete(deleteMovieData);

module.exports =  Router;