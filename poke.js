const inputElement = document.getElementById('pokemon-input');    // i used this video to get a grasp on how to use pokeapi https://www.youtube.com/watch?v=dVtnFH4m_fE&t=1s
const fetchButton = document.getElementById('fetch-button');                         
const cardContainer = document.getElementById('pokemon-displaycard-container');             // i also used the offical website to see resource lists https://pokeapi.co/docs/v2

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';                                        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

//function to handle the API call 
function fetchPokemon() {
    //  gget  the user input 
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
        // i missed error handler the first time 
        .catch(error => {
            console.error('couldnt fetch the pokemon:', error);
            cardContainer.innerHTML = `<p class="error">cant find that Pokémon Error: ${error.message}</p>`;
        });
}

//function to process and display the JSON data
function displayPokemonCard(data) {
    // use and format  info
    const name = data.name.toUpperCase();
    const id = data.id;
    // Use the official artwork of the pokemon 
    const image = data.sprites.other["official-artwork"].front_default || data.sprites.front_default;

    // process  pokemon Types and moves using map
    const types = data.types
        .map(typeInfo => typeInfo.type.name.toUpperCase())
        .join(' / '); // join with a separator

    const abilities = data.abilities
        .map(abilityInfo => {
            // eplace hyphens and capitalize
            return abilityInfo.ability.name.replace(/-/g, ' ').toUpperCase();
        })
        .join(', '); // join with a comma and space

    // make poke Stats into htmll table rows
    const statsTableContent = data.stats.map(statInfo => {
        // api path statInfo.base_stat and statInfo.stat.name
        const statName = statInfo.stat.name.replace(/-/g, ' ').toUpperCase();
        const baseStat = statInfo.base_stat;
        return `
            <tr>
                <th>${statName}</th>
                <td>${baseStat}</td>
            </tr>
        `;
    }).join(''); //put all the rows together

    //the final HTML structure after you look up the pokemon 
    //artwork comes from the api
    let htmlContent = `
        <div class="pokemon-card">
            <h2 class="card-name">${name} (#${id})</h2>
            <img src="${image}" alt="${name} official artwork" class="pokemon-image"> 
            
            <div class="card-details">
                <p><strong>Type(s):</strong> <span>${types}</span></p>
                <p><strong>Abilities:</strong> <span>${abilities}</span></p>
                <p><strong>Height:</strong> ${data.height / 10} m</p>
                <p><strong>Weight:</strong> ${data.weight / 10} kg</p>
                
                <h3>Base Stats</h3>
                <table class="stats-table">
                    <tbody>
                        ${statsTableContent}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    // inject the content into the container
    cardContainer.innerHTML = htmlContent;
} 
// ttach the fetch poke to the btn 
fetchButton.addEventListener('click', fetchPokemon);