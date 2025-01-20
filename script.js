let allDeputados = [];

const urlAPI = "https://dadosabertos.camara.leg.br/api/v2/deputados";

function createCards(deputados) {
  const cards = document.getElementById("cards");
  cards.innerHTML = "";

  deputados.slice(0, 3).forEach((deputado) => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = deputado.urlFoto;
    img.alt = deputado.nome;

    const nome = document.createElement("h3");
    nome.textContent = deputado.nome;

    const partido = document.createElement("p");
    partido.textContent = deputado.siglaPartido;

    const estado = document.createElement("p");
    estado.textContent = deputado.siglaUf;

    card.appendChild(img);
    card.appendChild(nome);
    card.appendChild(partido);
    card.appendChild(estado);

    cards.appendChild(card);
  });
}

fetch(urlAPI)
  .then((res) => res.json())
  .then((data) => {
    allDeputados = data.dados;
    createCards(allDeputados);
  });

function searchDeputado(str) {
  const filtered = allDeputados.filter((deputado) => {
    return deputado.nome.toLowerCase().includes(str.toLowerCase());
  });
  createCards(filtered);
}

const searchInput = document.getElementById("search-deputados");

searchInput.addEventListener("input", (e) => {
  searchDeputado(e.target.value);
});
