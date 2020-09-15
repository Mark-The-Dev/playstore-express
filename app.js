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
      if (a[sort] > b[sort]) {
        return +1;
      } else if (a[sort] < b[sort]) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  if (genres && genres !== 'Action' && genres !== 'Puzzle' && genres !== 'Strategy'
    && genres !== 'Casual' && genres !== 'Arcade' && genres !== 'Card') {
    return res.status(400).json({ message: `this genre doesn't exist yet, dummy.` })
  }

  if (genres) {
    results = results.filter(app => {
      return app.Genres.includes(genres);

    }



    );
  }


  res
    .json(results);

});




app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});