const express = require('express');
const { determineGeneration, getPokemonData } = require('../helpers/pokemonHelpers');  // Helper function
const router = express.Router();

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

  // Get only the necessary data
  const { id, name } = pokemonData;
  const pokemon = { id, name };
  const instructions = 'To guess the type and generation of the pokemon, visit /api/submit-guess?type1=type1&type2=type2&gen=gen';
  const possibleAnswers = { types: [ 'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy' ], generations: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] };

  res.json({ pokemon, instructions, possibleAnswers });
});

// Get player answers through URL and redirect to answer page
router.get('/submit-guess', async (req, res) => {
  const type1 = req.query.type1;
  const type2 = req.query.type2;
  const gen = req.query.gen;

  if (!type1 || !gen) {
    return res.status(400).json({ error: 'Type 1 and generation are required' });
  }

  const pokemonId = Math.floor(Math.random() * 898) + 1;
  const pokemonData = await getPokemonData(pokemonId);  // Fetch Pokémon data from API

  const correctAnswers = {
    type1: pokemonData.types && pokemonData.types[0] ? pokemonData.types[0].type.name : 'Unknown',
    type2: pokemonData.types && pokemonData.types[1] ? pokemonData.types[1].type.name : null,
    gen: determineGeneration(pokemonData.id),
  };

  const { id, name, types } = pokemonData;
  const pokemon = { id, name, types };
  const playerAnswers = { type1, type2, gen };
  const results = { pokemon, playerAnswers, correctAnswers };

  res.json(results);
});

module.exports = router;
