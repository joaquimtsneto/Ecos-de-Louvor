
let todosHinos = [];
let hinarioAtual = "canticos.json";
let temaAtual = "";

const temasPorHinario = {
  "canticos.json": ['alegria', 'comunhão', 'esperança', 'fé', 'intimidade', 'louvor', 'redenção', 'santidade', 'segurança'],
  "cantor_cristao.json": ['adoração', 'arrependimento', 'cruz', 'esperança', 'fidelidade', 'fé', 'gratidão', 'justiça', 'louvor', 'oração', 'redenção', 'santidade', 'segurança', 'soberania', 'trindade']
};

document.addEventListener("DOMContentLoaded", () => {
  carregarHinos(hinarioAtual);
  configurarBotoes();
  configurarBusca();
  configurarDropdown();
});

function configurarBotoes() {
  document.getElementById("btn-canticos").addEventListener("click", () => {
    hinarioAtual = "canticos.json";
    temaAtual = "";
    carregarHinos(hinarioAtual);
    atualizarDropdownTemas();
    atualizarBotoesAtivos("btn-canticos");
  });

  document.getElementById("btn-cantor").addEventListener("click", () => {
    hinarioAtual = "cantor_cristao.json";
    temaAtual = "";
    carregarHinos(hinarioAtual);
    atualizarDropdownTemas();
    atualizarBotoesAtivos("btn-cantor");
  });

  document.getElementById("btn-todos").addEventListener("click", () => {
    temaAtual = "";
    exibirHinos(todosHinos);
    atualizarBotoesAtivos("btn-todos");
  });

  document.getElementById("btn-temas").addEventListener("click", () => {
    document.querySelector(".dropdown").classList.toggle("show");
  });
}

function configurarBusca() {
  const searchInput = document.querySelector("input");
  searchInput.addEventListener("input", () => {
    const termo = searchInput.value.toLowerCase();
    const resultados = todosHinos.filter(h =>
      (h.numero + " - " + h.titulo).toLowerCase().includes(termo)
    );
    exibirHinos(resultados);
  });
}

function configurarDropdown() {
  atualizarDropdownTemas();
}

function atualizarDropdownTemas() {
  const dropdown = document.getElementById("temasDropdown");
  dropdown.innerHTML = "";
  temasPorHinario[hinarioAtual].forEach(tema => {
    const item = document.createElement("div");
    item.textContent = tema;
    item.addEventListener("click", () => {
      temaAtual = tema;
      const filtrados = todosHinos.filter(h =>
        h.tema && h.tema.toLowerCase().split(',').some(t => t.trim() === tema.toLowerCase())
      );
      exibirHinos(filtrados);
      document.querySelector(".dropdown").classList.remove("show");
    });
    dropdown.appendChild(item);
  });
}

function atualizarBotoesAtivos(ativoId) {
  const botoes = document.querySelectorAll(".filter-buttons button");
  botoes.forEach(btn => {
    btn.classList.remove("active");
    if (btn.id === ativoId) {
      btn.classList.add("active");
    }
  });
}

function carregarHinos(arquivo) {
  fetch(arquivo)
    .then(res => res.json())
    .then(data => {
      todosHinos = data.map(h => ({
        numero: (h.numero || h["número"] || "").toString(),
        titulo: h.titulo || h["título"] || "",
        letra: h.letra || "",
        tema: h.tema || ""
      }));
      exibirHinos(todosHinos);
    });
}

function exibirHinos(lista) {
  let container = document.getElementById("hinosContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "hinosContainer";
    document.body.appendChild(container);
  }
  container.innerHTML = "";
  lista.forEach(h => {
    const bloco = document.createElement("div");
    bloco.style.backgroundColor = "white";
    bloco.style.borderRadius = "12px";
    bloco.style.padding = "20px";
    bloco.style.margin = "20px auto";
    bloco.style.maxWidth = "700px";
    bloco.style.textAlign = "left";
    bloco.style.boxShadow = "0px 2px 6px rgba(0, 0, 0, 0.05)";
    bloco.innerHTML = `<h3 style="color:#1e40af;">${h.numero} - ${h.titulo}</h3><pre>${h.letra}</pre>`;
    container.appendChild(bloco);
  });
}
