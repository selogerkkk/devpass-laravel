const conteudos = {
    Resultados: document.querySelector("#SearchResultados"),
    jsonUrlResultados: "../Src/Data/data.json",
    searchInput: document.getElementById("SearchInput")
};

const ResultText = document.getElementById("ResultText");
ResultText.style.display = "none";

const NoFoundSearch = document.getElementById("NoFoundSearch");
NoFoundSearch.style.display = "flex";

const NoFoundSearchText = document.getElementById("NoFoundSearchText");

// Função para buscar e atualizar os dados
function fetchData(container, jsonUrl, searchTerm) {
    fetch(jsonUrl)
        .then((response) => response.json())
        .then((data) => {
            // Limpar o conteúdo atual da div
            container.innerHTML = "";
            NoFoundSearchText.style.display = "none";
            ResultText.style.display = "flex";

            // Iterar sobre os dados e criar elementos HTML
            data.forEach((item) => {
                if (item.titulo.toLowerCase().includes(searchTerm.toLowerCase())) {

                    const ItemsDiv = document.createElement("li");
                    ItemsDiv.classList.add("Items");
                    ItemsDiv.id = item.titulo;

                    const divSearchContent = document.createElement("div");
                    divSearchContent.classList.add("SearchContent")

                    const divSearchInformation = document.createElement("div")
                    divSearchInformation.classList.add("SearchInformation");

                    const tipo = document.createElement("h3");
                    // tipo.textContent = item.tipo;
                    tipo.textContent = item.tipo.toUpperCase();
                    tipo.classList.add("TypeSearch");

                    const img = document.createElement("img");
                    img.src = item.imagem;
                    img.alt = `${item.titulo} image`;
                    img.classList.add("Image")

                    const link = document.createElement("a");
                    link.href = item.link;
                    link.classList.add("ItemTitle");
                    link.textContent = item.titulo;
                    link.setAttribute("target", "_blank");

                    const subtitle = document.createElement("h3");
                    subtitle.classList.add("Subtitle");
                    subtitle.textContent = item.subtitulo;

                    const buttonLink = document.createElement("a");
                    const button = document.createElement("button");
                    button.textContent = "Ler mais";
                    button.classList.add("ButtonResult")
                    buttonLink.classList.add("ButtonContainer")
                    buttonLink.classList.add("desktop")

                    buttonLink.href = item.link;
                    buttonLink.appendChild(button);

                    divSearchInformation.appendChild(link)
                    divSearchInformation.appendChild(subtitle)
                    divSearchInformation.appendChild(buttonLink)

                    divSearchContent.appendChild(img)
                    divSearchContent.appendChild(divSearchInformation)

                    ItemsDiv.appendChild(tipo)
                    ItemsDiv.appendChild(divSearchContent)

                    container.appendChild(ItemsDiv);
                }


                const TamanhoLista = container.getElementsByTagName('li').length
                if (!TamanhoLista) {
                    ResultText.innerText = "Nada encontrado..."
                    NoFoundSearch.style.display = "flex";
                } else {
                    if (container.getElementsByTagName('li').length === 1) {
                        ResultText.innerText = "Resultado (1) :"
                    } else {
                        ResultText.innerText = `Resultados (${TamanhoLista}) :`
                    }
                    NoFoundSearch.style.display = "none";
                }
            });
        })
        .catch((error) => {
            console.error("Ocorreu um erro ao buscar os dados: ", error);
        });
}

function setupSearchInput() {
    const desktopSearchInput = document.getElementById("desktopSearchInput");
    const mobileSearchInput = document.getElementById("mobileSearchInput");
    if (window.innerWidth < 768) { // Exemplo: 768px para alternar entre desktop e mobile
        mobileSearchInput.addEventListener("keyup", function (event) {
            const searchTerm = mobileSearchInput.value;
            if (searchTerm) {
                NoFoundSearch.style.display = "none"
                fetchData(conteudos.Resultados, conteudos.jsonUrlResultados, searchTerm);
            } else {
                conteudos.Resultados.innerHTML = "";
                ResultText.style.display = "none";
                NoFoundSearch.style.display = "flex";
                NoFoundSearchText.style.display = "flex"
            }
        });
    } else {
        desktopSearchInput.addEventListener("keyup", function (event) {
            const searchTerm = desktopSearchInput.value;
            if (searchTerm) {
                NoFoundSearch.style.display = "none"
                fetchData(conteudos.Resultados, conteudos.jsonUrlResultados, searchTerm);
            } else {
                conteudos.Resultados.innerHTML = "";
                ResultText.style.display = "none";
                NoFoundSearch.style.display = "flex";
                NoFoundSearchText.style.display = "flex"
            }
        });
    }
}

// Execute a função setupSearchInput quando a página carregar e quando a janela for redimensionada
window.addEventListener("load", setupSearchInput());
window.addEventListener("resize", setupSearchInput);

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(decodeURIComponent(results[2].replace(/\+/g, " ")));
}

document.addEventListener("DOMContentLoaded", function () {
    const searchTerm = getParameterByName("search");
    if (searchTerm) {
        // Decodifique o termo de pesquisa
        const decodedSearchTerm = decodeURIComponent(searchTerm);
        // Preencha o campo de pesquisa com o termo decodificado
        const desktopSearchInput = document.getElementById("desktopSearchInput");
        desktopSearchInput.value = decodedSearchTerm;

        const mobileSearchInput = document.getElementById("mobileSearchInput");
        mobileSearchInput.value = decodedSearchTerm;

        fetchData(conteudos.Resultados, conteudos.jsonUrlResultados, decodedSearchTerm);
    }
});