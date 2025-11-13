let page = 1;
let totalPages = 42;

const previousPage = document.getElementById("prev-page");
const nextPage = document.getElementById("next-page");
const pageNumber = document.getElementById("page-number");
const totalPagesSpan = document.getElementById("total-pages");

const characterList = document.getElementById("character-list");

const template = (character) => {
    return `<li class="character-container">
        <img src='${character.image}'>
        <p><span>Name:</span> ${character.name}</p>
        <p><span>Species:</span> ${character.species}</p>
    </li>`
};

function hacerPeticion() {
    console.log("Page " + page + "/" + totalPages);
    pageNumber.value = page;
    disableButtons();
    fetch("https://rickandmortyapi.com/api/character/?page=" + page)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        totalPages = data.info.pages;
        totalPagesSpan.textContent = totalPages;
        const characters = data.results;
        const structure = characters.map(character => template(character)).join("");
        characterList.innerHTML = structure;
    })
    .catch((error) => {
        console.error(error);
        characterList.innerHTML = `<p class="error">${error}</p>`;
    });
}

function disableButtons() {
    nextPage.setAttribute("disabled", true);
    previousPage.setAttribute("disabled", true);
    setTimeout(() => {
        pageNumberCheck();
    }, 500);
}

function pageNumberCheck() {
    if (page <= 1) {
        previousPage.setAttribute("disabled", true);
        nextPage.removeAttribute("disabled");
    } else if (page >= totalPages) {
        nextPage.setAttribute("disabled", true);
        previousPage.removeAttribute("disabled");
    } else {
        nextPage.removeAttribute("disabled");
        previousPage.removeAttribute("disabled");
    }
}

previousPage.addEventListener("click", () => {
    if (page > 1) {
        page--;
        hacerPeticion();
    }
});

nextPage.addEventListener("click", () => {
    if (page < totalPages) {
        page++;
        hacerPeticion();
    }
});

pageNumber.addEventListener("blur", (e) => {
    const value = e.target.value;
    if (value < 1 || value > totalPages) {
        e.target.value = page;
    } else {
        page = value;
        hacerPeticion();
    }
});

window.onload = function() {
    hacerPeticion();
}