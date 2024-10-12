const express = require('express');
const { determineGeneration, getPokemonData } = require('../helpers/pokemonHelpers');  // Helper function
const router = express.Router();

// Game Data
let gameData = {};

// Home page route
router.get('/', (req, res) => {
  res.render('index');
});

// Guess page route
router.get('/guess', async (req, res) => {
  const pokemonId = Math.floor(Math.random() * 898) + 1;
  const pokemonData = await getPokemonData(pokemonId);
  gameData.pokemonData = pokemonData;
  res.render('guess', { pokemonData });
});

// Submit guess
router.post('/submit-guess', (req, res) => {
  const { type1, type2, gen } = req.body;
  gameData.playerAnswers = { type1, type2, gen };
  res.redirect('/answer');
});


// Answer page route
router.get('/answer', (req, res) => {
  const referer = req.headers.referer;
  if (!referer || (!referer.includes('/guess') && !referer.includes('/submit-guess'))) {
    return res.status(403).send('Access denied');
  }

  const pokemonData = gameData.pokemonData;
  const playerAnswers = gameData.playerAnswers;

  if (!playerAnswers) {
    return res.status(400).send('No player answers found');
  }

  res.render('answer', {
    pokemonData,
    playerAnswers,
    determineGeneration,
  });
});

module.exports = router;