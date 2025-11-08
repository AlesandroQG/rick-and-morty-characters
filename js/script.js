let page = 1;
const pages = 42;

const previous = document.getElementById("prev-page");
const next = document.getElementById("next-page");
const pageNumber = document.getElementById("page-number");

const list = document.getElementById("character-list");

const template = (character) => {
    return `<li class="character-container">
        <img src='${character.image}'>
        <p><span>Name:</span> ${character.name}</p>
        <p><span>Species:</span> ${character.species}</p>
    </li>`
};

function hacerPeticion() {
    console.log("Page " + page + "/" + pages);
    pageNumber.value = page;
    fetch("https://rickandmortyapi.com/api/character/?page=" + page)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Unable to obtain data");
            }
            return response.json();
        })
        .then((data) => {
            const characters = data.results;
            const structure = characters.map(character => template(character)).join("");
            list.innerHTML = structure;
        })
        .catch((error) => {
            console.error(error);
        });
}

previous.addEventListener("click", () => {
    if (page > 1) {
        page--;
        hacerPeticion();
    }
});

next.addEventListener("click", () => {
    if (page < pages) {
        page++;
        hacerPeticion();
    }
});

pageNumber.addEventListener("blur", (e) => {
    const value = e.target.value;
    if (value < 1 || value > pages) {
        e.target.value = page;
    } else {
        page = value;
        hacerPeticion();
    }
});

hacerPeticion();
