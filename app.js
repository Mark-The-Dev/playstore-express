'use strict';

const express = require('express');
const morgan = require('morgan');
const games = require('./play-store.js');

const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res) => {
  const {sort, genres} = req.query;

  res
    .json(games);

});




app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});