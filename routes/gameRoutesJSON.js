const express = require('express');
const { determineGeneration, getPokemonData } = require('../helpers/pokemonHelpers');  // Helper function
const router = express.Router();

// Game Data
let gameData = {};

// Home page route
router.get('/', (req, res) => {
  const info = {};
  info.title = 'Welcome to the Pokémon Guessing Game API';
  info.instructions = 'Visit /api/guess to start the game';
  res.json(info);
});

// Guess page route
router.get('/guess', async (req, res) => {
  const pokemonId = Math.floor(Math.random() * 898) + 1;
  const pokemonData = await getPokemonData(pokemonId);  // Fetch Pokémon data from API
  gameData.pokemonData = pokemonData;  // Store pokemonData in gameData

  const { id, name } = pokemonData;
  const pokemon = { id, name };
  const instructions = 'To guess the type and generation of the pokemon, visit /api/submit-guess?type1=type1&type2=type2&gen=gen';
  const possibleAnswers = { types: [ 'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy' ], generations: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] };

  res.json({ pokemon, instructions, possibleAnswers });
});

// Get player answers through URL and redirect to answer page
router.get('/submit-guess', (req, res) => {
  const { type1, type2, gen } = req.query;
  
  if (!gameData.pokemonData) {
    return res.status(400).json({ error: 'No Pokémon data found. Please start from /api/guess.' });
  }
  
  gameData.playerAnswers = { type1, type2, generation: gen };  // Store player's answers in gameData
  res.redirect('/api/answer');
});

// Answer page route
router.get('/answer', (req, res) => {
  const pokemonData = gameData.pokemonData;
  const playerAnswers = gameData.playerAnswers;

  if (!pokemonData) {
    return res.status(400).json({ error: 'No Pokémon data found. Please start from /api/guess.' });
  }

  if (!playerAnswers) {
    return res.status(400).json({ error: 'No player answers found. Please submit your guess first.' });
  }

  const { id, name, types } = pokemonData;
  const pokemon = { id, name, types };

  res.json({
    pokemon,
    playerAnswers,
    correctGeneration: determineGeneration(pokemonData.id),  // Correct generation calculation
  });
});

module.exports = router;
