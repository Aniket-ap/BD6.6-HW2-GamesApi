const express = require('express');
const app = express();
const { getAllGames, getGameById } = require('./games');
app.use(express.json());

app.get('/games', (req, res) => {
  const games = getAllGames();
  if (games.length > 0) {
    res.status(200).json({ games });
  } else {
    res.status(404).json({ error: 'No games found' });
  }
});

app.get('/games/details/:id', (req, res) => {
  const game = getGameById(parseInt(req.params.id, 10));
  if (game) {
    res.status(200).json({ game });
  } else {
    res.status(404).json({ error: 'Game not found' });
  }
});

module.exports = { app };
