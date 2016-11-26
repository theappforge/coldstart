'use strict';

const cheerio = require('cheerio'),
    request = require('request-promise');

let getFilm = function* (id) {
  let html = yield request.get(`http://www.imdb.com/title/${id}/keywords`);
  let $ = cheerio.load(html);
  let result = {
    id,
    title : $('.subnav_heading').first().html(),
    keywords : []
  };

  $('.dataTable.evenWidthTable2Col .sodatext a').map(function(i, node) {
    let n = $(node);
    result.keywords.push({
      link: n.attr('href'),
      text: n.html()
    });
  });

  return result;
};

let findSimilar = function* (id) {
  let html = yield request.get(`http://www.imdb.com/title/${id}/`);
  let $ = cheerio.load(html);
  const items = $('.rec_slide .rec_item');
  return items.get(parseInt(Math.random() * items.length)).attr('data-tconst');
};

module.exports = {
  getFilm,
  findSimilar
};