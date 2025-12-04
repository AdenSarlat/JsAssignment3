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
        //function to process and display the JSON data

function displayPokemonCard(data) {
    // use and format  info
                const name = data.name.toUpperCase();
                        const id = data.id;
    // Use the official artwork of the pokemon 
    const image = data.sprites.other["official-artwork"].front_default || data.sprites.front_default; 
    
    // process  pokemon Types and moves using map
    const types = data.types
        .map(typeInfo => typeInfo.type.name.toUpperCase())
        .join(' / '); // join with a separator

    const abilities = data.abilities
        .map(abilityInfo => {
            // eplace hyphens and capitalize
            return abilityInfo.ability.name.replace(/-/g, ' ').toUpperCase(); 
        })
                .join(', '); // join with a comma and space
}
}