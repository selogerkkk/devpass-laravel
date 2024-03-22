const containers = document.querySelectorAll('.ContainerItems');

// Função para adicionar funcionalidade de arrastar e rolagem a um único elemento
function addDragAndScrollFunctionality(container) {
    let isDragging = false;
    let startPositionX = 0;

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        startPositionX = e.clientX;
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const offsetX = e.clientX - startPositionX;
        container.scrollLeft -= offsetX;
        startPositionX = e.clientX;
    });

    container.addEventListener('mouseup', () => {
        isDragging = false;
    });

    container.addEventListener('mouseleave', () => {
        isDragging = false;
    });
}

// Itere sobre os elementos e adicione a funcionalidade a cada um
containers.forEach(container => {
    addDragAndScrollFunctionality(container);
});


const conteudos = {
    Vagas: document.querySelector("#ConteudoVagas"),
    jsonUrlVagas: "Src/Vagas/data.json",

    Comunidades: document.querySelector("#ConteudoComunidades"),
    jsonUrlComunidades: "Src/Comunidades/data.json",

    Noticias: document.querySelector("#ConteudoNoticias"),
    jsonUrlNoticias: "Src/NoticiasDev/data.json"
};

// Função para buscar e atualizar os dados
function fetchData(container, jsonUrl) {
    fetch(jsonUrl)
        .then((response) => response.json())
        .then((data) => {
            // Limpar o conteúdo atual da div
            container.innerHTML = "";

            // Iterar sobre os dados e criar elementos HTML
            data.forEach((item) => {
                const itemDiv = document.createElement("div");
                itemDiv.classList.add("Items");

                const img = document.createElement("img");
                img.src = item.imagem;
                img.alt = "ImagemItem";

                const link = document.createElement("a");
                link.href = item.link;
                link.classList.add("VagaTitle");
                link.textContent = item.titulo;
                link.setAttribute("target", "_blank");



                itemDiv.appendChild(img);
                itemDiv.appendChild(link);

                container.appendChild(itemDiv);
            });
        })
        .catch((error) => {
            console.error("Ocorreu um erro ao buscar os dados: ", error);
        });
}

// Chame a função para buscar e atualizar os dados
fetchData(conteudos.Vagas, conteudos.jsonUrlVagas);
fetchData(conteudos.Comunidades, conteudos.jsonUrlComunidades);
fetchData(conteudos.Noticias, conteudos.jsonUrlNoticias);


function performSearch() {
    const searchTerm = searchInput.value;
    const redirectURL = '../SearchPage/Index.html' + `?search=${encodeURIComponent(searchTerm)}`;
    window.location.href = redirectURL;
}

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", performSearch);

const searchInput = document.getElementById("desktopSearchInput");
searchInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        performSearch();
    }
});