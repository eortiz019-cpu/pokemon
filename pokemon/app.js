// -------------------------
// FUNCIONES DE LA POKEDEX
// -------------------------

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonList = document.getElementById("pokemon-list");

// Buscar al hacer click
searchButton.addEventListener("click", () => {
    buscarPokemon();
});

// Buscar al presionar Enter
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") buscarPokemon();
});

async function buscarPokemon() {
    let pokemon = searchInput.value.toLowerCase().trim();

    if (pokemon === "") {
        alert("Escribe el nombre de un Pokémon.");
        return;
    }

    // Borrar resultados previos
    pokemonList.innerHTML = "";

    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        if (!respuesta.ok) {
            alert("Pokémon no encontrado. Intenta con otro nombre.");
            return;
        }

        const data = await respuesta.json();
        mostrarPokemon(data);

    } catch (error) {
        alert("Error al conectar con la PokéAPI.");
        console.error(error);
    }
}

// -------------------------
// MOSTRAR TARJETA
// -------------------------

function mostrarPokemon(data) {

    const tipos = data.types
        .map(t => `<span class="type-pill type-${t.type.name}">${t.type.name}</span>`)
        .join("");

    const li = document.createElement("li");
    li.classList.add("pokedex-card");

    li.innerHTML = `
        <div class="pokedex-header">
            <span>#${data.id.toString().padStart(3, "0")}</span>
        </div>

        <h3 class="pokedex-name">${data.name}</h3>

        <div class="pokedex-image">
            <img src="${data.sprites.other["official-artwork"].front_default}"
                 alt="${data.name}">
        </div>

        <div class="pokedex-meta">
            <span>Peso: ${(data.weight / 10)} kg</span>
            <span>Altura: ${(data.height / 10)} m</span>
        </div>

        <div class="pokedex-stats">
            <div class="stat-item">
                <div class="stat-label">HP</div>
                <div class="stat-value">${data.stats[0].base_stat}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">ATK</div>
                <div class="stat-value">${data.stats[1].base_stat}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">DEF</div>
                <div class="stat-value">${data.stats[2].base_stat}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">SPD</div>
                <div class="stat-value">${data.stats[5].base_stat}</div>
            </div>
        </div>

        <div style="margin-top: 10px;">
            ${tipos}
        </div>
    `;

    pokemonList.appendChild(li);
}