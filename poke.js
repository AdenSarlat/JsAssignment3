const inputElement = document.getElementById('pokemon-input');
const fetchButton = document.getElementById('fetch-button');
const cardContainer = document.getElementById('pokemon-card-container');
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

//function to handle the API call 
function fetchPokemon() {
    //  gget  the user input 
    const pokemonQuery = inputElement.value.toLowerCase().trim();

    if (!pokemonQuery) {
        cardContainer.innerHTML = '<p class="error"> enter a Pokémon name or Pokedex Number!</p>'; //when the search bar is empty display this
        return;
    }
                const finalURL = BASE_URL + pokemonQuery;

      cardContainer.innerHTML = `<h2>findingg**${pokemonQuery}**</h2>`;
    
    // apicall using fetch()
                     fetch(finalURL)
        .then(response => {
            // lookk for a bad response that doesnt work, not a pokemon name or correct number
            if (!response.ok) {
                throw new Error(`Pokémon isnt here Status: ${response.status}`);
            }
            return response.json(); // convert the response to JSON
        })
        .then(data => {
            // IT WORKED show the detailed Pokémon card
                         displayPokemonCard(data); 
        })
}