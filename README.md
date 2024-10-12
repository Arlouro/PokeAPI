# Pokémon Guessing Game

## Description

This is a simple Pokémon guessing game built with Express.js and EJS. The game fetches random Pokémon data from the PokéAPI and asks the player to guess its type and generation. After submitting the guess, the player is shown whether their answers were correct and the correct Pokémon information.

## How to Run the Project

### Prerequisites

Node.js (version 14 or higher) installed on your system.
npm (Node Package Manager) to install dependencies.

### Step-by-Step Guide

1. **Clone the repository:** 

```bash
git clone <repository-url>
cd poke-api-project
```

2. **Install dependencies:** Inside the project directory, run:

```bash
npm install
```

3. **Run the server:** After installing the dependencies, run the server with the following command:

```bash
npm start
```

The server will start and be accessible at ``http://localhost:8080.``

4. **Access the game:** Open your browser and go to ``http://localhost:8080``. You will see the home page. Click the "Start Game" button to begin.

5. **Gameplay:**

- The game will show a random Pokémon and prompt you to guess its type and generation.
- After submitting your guess, you'll be redirected to a results page where your answers will be evaluated.
- If you want to play again, you can simply click "Try Again."


## Functionalities

### HTML/CSS/EJS

- **Home Page (``/``)**: Displays a welcome page with a brief description of the game and a "Start Game" button.
- **Guess Page (``/guess``)**: Displays a random Pokémon sprite and prompts the user to guess the Pokémon's type and generation.
- **Submit Guess (``/submit-guess``)**: Processes the player's guess and redirects to the results page (/answer).
- **Answer Page (``/answer``)**: Displays the player's guesses, along with the correct Pokémon type and generation.

### JSON

This functionality has the purpose to work similarly to the ``HTML/CSS/EJS`` version but showing the information only in ``JSON``.
- **Home Page (``/api``)**: Displays a welcome page with instruction on how to advance.
- **Guess Page(``/api/guess``)**: Displays a random Pokémon name and id in ``JSON``, and prompts the user to guess the Pokémon's type and generation, but this time through the URL.
- **Submit Guess (``/submit-guess``)**: Processes the player's guess given by the URL (``/api/submit-guess?type1=type1&type2=type2&gen=gen``), and redirects to the results page (``/answer``).
- **Answer Page (``/api/answer``)**: Displays the player's guesses, along with the correct Pokémon type and generation, but in ``JSON``.

## Features:

- The game uses a random Pokémon ID to fetch data from the *PokéAPI*.
- The user is asked to guess the Pokémon's type and generation.
- After submitting their guesses, the results are displayed on a new page showing the correct type and generation.
- The game uses Express as the server and EJS for rendering views.

### Additional Features:

- **Security**: The game does not let the player visit the answer page directly without submitting a guess.

## Technologies Used

- **Express.js:** A Node.js web application framework that provides a robust set of features for web and mobile applications.

- **EJS (Embedded JavaScript):** A templating language that lets you generate HTML markup with plain JavaScript.

- **PokéAPI:** A free public API that provides detailed information about Pokémon species, moves, abilities, types, and more.

## Chosen Public API: PokéAPI

### Overview

PokéAPI is a free public API that provides detailed information about Pokémon data, including Pokémon species, moves, abilities, types, and more. In this project, we use the PokéAPI v2 to fetch data about a random Pokémon. Specifically, we use the Pokémon's ID to fetch data like the Pokémon's type, name, and sprite image.

### How the API is Used

- **Fetching Pokémon Data:** The API is queried with the Pokémon's ID (ranging from 1 to 898). The response includes details such as:
  - **Name:** The Pokémon's name (e.g., Pikachu, Bulbasaur).
  - **Types:** The types associated with the Pokémon (e.g., Electric, Fire).
  - **Sprites:** A link to the Pokémon's sprite image for display in the game.
  - **Generation:** The Pokémon's generation is inferred based on its ID.

## Example API Request

To get data for a Pokémon, the API URL looks like this:

```bash
https://pokeapi.co/api/v2/pokemon/{pokemon_id}
```

For example, to get data for Pikachu (ID: 25), the API request would be:

```bash
https://pokeapi.co/api/v2/pokemon/25
```

The response contains JSON data like this:

```json
{
  "name": "pikachu",
  "id": 25,
  "types": [
    {
      "type": {
        "name": "electric"
      }
    }
  ],
  "sprites": {
    "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
  }
}
```

### Key Features of the API

- **Free to Use:** No authentication required.
- **Wide Coverage:** Data for all Pokémon species across all generations.
- **Comprehensive:** Includes Pokémon information needed for the game (id, names, types, generation and sprites).
- **Data Available in JSON Format:** Needed for the project and easy to integrate into applications.

### How the API Is Integrated into the Game

1. When the player navigates to the /guess page, a random Pokémon ID is selected.
2. The server makes a request to the PokéAPI for that Pokémon's data (name, type, sprite).
3. The player guesses the Pokémon's type and generation.
4. The result is displayed on the /answer page with the correct answers shown.

## Folder Structure

Here’s a brief overview of the folder structure of the project:

```bash
/poke-api-project
│
├── /node_modules        # Installed npm packages (automatically created by npm)
├── /public              # Static assets (CSS, images)
│   └── /styles          # CSS files for each page
│       ├── answer.css   # Styles for the answer page
│       ├── guess.css    # Styles for the guess page
│       └── index.css    # Styles for the home page
│
├── /views               # EJS templates (for rendering HTML)
│   ├── index.ejs        # Home page template
│   ├── guess.ejs        # Guess page template
│   └── answer.ejs       # Answer page template
│
├── /routes              # Express route definitions
│   └── gameRoutes.js    # Handles all game routes
│
├── /helpers             # Helper functions (e.g., determine Pokémon generation)
│   └── pokemonHelpers.js # Contains helper functions like determineGeneration
│
├── package.json         # Project dependencies and metadata
└── server.js            # Main entry point for the server
```

## Conclusion

This project provides a fun and simple Pokémon guessing game using Express.js and EJS. It fetches real-time Pokémon data from the PokéAPI and allows users to guess the Pokémon's type and generation. After submitting their guesses, the player can see the correct answers and try again.
