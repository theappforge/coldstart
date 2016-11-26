'use strict';

var express = require('express');
var router = express.Router();

const imdb = require('./imdb'),
    wrap = require('co-express');

/* GET home page. */
router.get('/', wrap(function* (req, res) {
  let id = req.query.id;
  let film = yield imdb.getFilm(id ? id : 'tt1211837');
  res.render('index', {film});
}));

router.get('/rate', wrap(function* (req, res) {
  let id = req.query.id;
  let like = req.query.like;
  if (!!like) {
    let newFilmId = yield imdb.findSimilar(id);
    return res.redirect(`/?id=${newFilmId}`)
  }
}));

module.exports = router;
