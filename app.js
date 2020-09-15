'use strict';

const express = require('express');
const morgan = require('morgan');
const games = require('./play-store.js');

const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res) => {
  const { sort, genres } = req.query;
  let results = [...games];

  if (sort && sort !== 'Rating' && sort !== 'App') {
    return res.status(400).json({ message: 'sort must be either Rating or App' })
  }
  if (sort) {
    results.sort((a, b) => {
      if (a[sort] > b[sort]){
        return +1;
      } else if (a[sort] < b[sort]){
        return -1;
      } else {
        return 0;
      }
    });
  }

//  let genreTopics = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']

  // let filterGenre = genreTopics.map(eve => {
  //   if (genres !== eve) {
  //     return res.status(400).json({ message: 'please use a correct genre' });
  //   }
  // });

  res
    .json(results);

});




app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});