// Determine the generation of a Pokémon based on its Pokédex number
function determineGeneration(pokemonId) {
  if (pokemonId <= 151) return 1;  // Generation 1
  if (pokemonId <= 251) return 2;  // Generation 2
  if (pokemonId <= 386) return 3;  // Generation 3
  if (pokemonId <= 493) return 4;  // Generation 4
  if (pokemonId <= 649) return 5;  // Generation 5
  if (pokemonId <= 721) return 6;  // Generation 6
  if (pokemonId <= 809) return 7;  // Generation 7
  return 8;  // Generation 8
}

// Delay function
async function delay(seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}

// Fetch Pokémon data from the PokéAPI
async function getPokemonData(pokemonId, tries = 0) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  const response = await fetch(url);

  // Retry the request up to 3 times if it fails
  if (!response.ok) {
    delay(1); // Delay for 1 second
    tries++;
    if (tries === 3) {
      throw new Error('Failed to fetch Pokémon data');
    }
    return getPokemonData(pokemonId, tries);
  }

  const data = await response.json();
  return data;
}

module.exports = { determineGeneration, getPokemonData };