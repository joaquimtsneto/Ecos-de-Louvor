
let todosHinos = [];
let hinarioAtual = "canticos.json";
let temaAtual = "";

const temasPorHinario = {
  "canticos.json": ['alegria', 'alegria, esperança', 'alegria, esperança, louvor, redenção', 'alegria, fé', 'alegria, fé, louvor, redenção', 'alegria, intimidade, santidade', 'alegria, louvor', 'alegria, louvor, redenção', 'alegria, louvor, redenção, segurança', 'alegria, louvor, santidade', 'alegria, redenção', 'alegria, redenção, segurança', 'comunhão', 'comunhão, esperança, louvor, redenção', 'comunhão, redenção', 'comunhão, redenção, santidade', 'esperança', 'esperança, fé', 'esperança, fé, louvor, redenção', 'esperança, louvor', 'esperança, louvor, redenção', 'fé', 'fé, louvor, redenção, santidade', 'fé, louvor, segurança', 'fé, redenção, segurança', 'intimidade', 'intimidade, louvor', 'intimidade, louvor, redenção', 'intimidade, louvor, santidade, segurança', 'intimidade, redenção', 'intimidade, redenção, santidade', 'louvor', 'louvor, redenção', 'louvor, redenção, santidade', 'louvor, redenção, segurança', 'louvor, santidade', 'louvor, segurança', 'redenção', 'redenção, santidade', 'redenção, segurança', 'santidade', 'segurança'],
  "cantor_cristao.json": ['adoração, louvor, soberania, gratidão', 'arrependimento', 'arrependimento, cruz, esperança, fé, louvor, oração, redenção', 'arrependimento, cruz, esperança, fé, louvor, redenção', 'arrependimento, cruz, esperança, fé, louvor, redenção, santidade', 'arrependimento, cruz, esperança, fé, oração, redenção, santidade, segurança', 'arrependimento, cruz, esperança, fé, redenção', 'arrependimento, cruz, esperança, fé, redenção, santidade', 'arrependimento, cruz, esperança, fé, redenção, segurança', 'arrependimento, cruz, esperança, louvor', 'arrependimento, cruz, esperança, louvor, oração, santidade, segurança', 'arrependimento, cruz, esperança, louvor, redenção', 'arrependimento, cruz, esperança, louvor, redenção, santidade', 'arrependimento, cruz, esperança, louvor, redenção, segurança', 'arrependimento, cruz, esperança, oração, redenção', 'arrependimento, cruz, esperança, oração, redenção, segurança', 'arrependimento, cruz, esperança, redenção', 'arrependimento, cruz, esperança, redenção, santidade', 'arrependimento, cruz, esperança, redenção, santidade, segurança', 'arrependimento, cruz, esperança, redenção, segurança', 'arrependimento, cruz, fé, louvor, redenção', 'arrependimento, cruz, fé, louvor, redenção, segurança', 'arrependimento, cruz, fé, oração, redenção', 'arrependimento, cruz, fé, oração, redenção, segurança', 'arrependimento, cruz, fé, redenção', 'arrependimento, cruz, fé, redenção, santidade, segurança', 'arrependimento, cruz, fé, redenção, segurança', 'arrependimento, cruz, louvor, oração, redenção, santidade', 'arrependimento, cruz, louvor, oração, redenção, segurança', 'arrependimento, cruz, louvor, redenção', 'arrependimento, cruz, louvor, redenção, santidade', 'arrependimento, cruz, louvor, redenção, segurança', 'arrependimento, cruz, oração, redenção', 'arrependimento, cruz, oração, redenção, santidade', 'arrependimento, cruz, oração, redenção, segurança', 'arrependimento, cruz, redenção', 'arrependimento, cruz, redenção, santidade', 'arrependimento, cruz, redenção, santidade, segurança', 'arrependimento, cruz, redenção, segurança', 'arrependimento, esperança, fé, louvor, oração, redenção, santidade', 'arrependimento, esperança, fé, louvor, oração, redenção, santidade, segurança', 'arrependimento, esperança, fé, louvor, oração, redenção, segurança', 'arrependimento, esperança, fé, louvor, redenção, segurança', 'arrependimento, esperança, fé, louvor, santidade, segurança', 'arrependimento, esperança, fé, oração, redenção', 'arrependimento, esperança, fé, oração, redenção, santidade', 'arrependimento, esperança, fé, oração, redenção, santidade, segurança', 'arrependimento, esperança, fé, oração, santidade', 'arrependimento, esperança, fé, redenção', 'arrependimento, esperança, fé, redenção, segurança', 'arrependimento, esperança, louvor, oração, redenção', 'arrependimento, esperança, louvor, oração, redenção, santidade', 'arrependimento, esperança, louvor, oração, redenção, santidade, segurança', 'arrependimento, esperança, louvor, oração, redenção, segurança', 'arrependimento, esperança, louvor, redenção', 'arrependimento, esperança, louvor, redenção, santidade', 'arrependimento, esperança, louvor, redenção, santidade, segurança', 'arrependimento, esperança, louvor, redenção, segurança', 'arrependimento, esperança, louvor, santidade', 'arrependimento, esperança, oração, redenção', 'arrependimento, esperança, oração, redenção, segurança', 'arrependimento, esperança, redenção', 'arrependimento, esperança, redenção, santidade', 'arrependimento, esperança, redenção, santidade, segurança', 'arrependimento, esperança, redenção, segurança', 'arrependimento, esperança, santidade, segurança', 'arrependimento, esperança, segurança', 'arrependimento, fé, louvor, oração, redenção', 'arrependimento, fé, louvor, oração, redenção, santidade', 'arrependimento, fé, louvor, redenção, santidade', 'arrependimento, fé, louvor, redenção, santidade, segurança', 'arrependimento, fé, oração, redenção', 'arrependimento, fé, oração, redenção, santidade, segurança', 'arrependimento, fé, oração, redenção, segurança', 'arrependimento, fé, redenção', 'arrependimento, fé, redenção, segurança', 'arrependimento, louvor, oração', 'arrependimento, louvor, oração, redenção', 'arrependimento, louvor, oração, redenção, santidade, segurança', 'arrependimento, louvor, redenção', 'arrependimento, louvor, redenção, santidade', 'arrependimento, louvor, redenção, segurança', 'arrependimento, louvor, santidade', 'arrependimento, louvor, segurança', 'arrependimento, oração', 'arrependimento, oração, redenção', 'arrependimento, oração, redenção, santidade', 'arrependimento, oração, redenção, segurança', 'arrependimento, oração, santidade', 'arrependimento, oração, segurança', 'arrependimento, redenção', 'arrependimento, redenção, santidade', 'arrependimento, redenção, santidade, segurança', 'arrependimento, redenção, segurança', 'cruz', 'cruz, esperança, fé, louvor, oração, redenção, santidade, segurança', 'cruz, esperança, fé, louvor, oração, redenção, segurança', 'cruz, esperança, fé, louvor, redenção', 'cruz, esperança, fé, louvor, redenção, santidade', 'cruz, esperança, fé, louvor, redenção, santidade, segurança', 'cruz, esperança, fé, louvor, redenção, segurança', 'cruz, esperança, fé, louvor, segurança', 'cruz, esperança, fé, oração, redenção, santidade, segurança', 'cruz, esperança, fé, redenção', 'cruz, esperança, fé, segurança', 'cruz, esperança, louvor, oração, redenção', 'cruz, esperança, louvor, oração, redenção, santidade', 'cruz, esperança, louvor, oração, redenção, santidade, segurança', 'cruz, esperança, louvor, oração, redenção, segurança', 'cruz, esperança, louvor, redenção', 'cruz, esperança, louvor, redenção, santidade', 'cruz, esperança, louvor, redenção, santidade, segurança', 'cruz, esperança, louvor, redenção, segurança', 'cruz, esperança, oração', 'cruz, esperança, oração, redenção', 'cruz, esperança, oração, redenção, santidade, segurança', 'cruz, esperança, redenção', 'cruz, esperança, redenção, santidade', 'cruz, esperança, redenção, santidade, segurança', 'cruz, esperança, redenção, segurança', 'cruz, fé, louvor, oração, redenção, segurança', 'cruz, fé, oração, redenção', 'cruz, fé, oração, redenção, santidade', 'cruz, fé, redenção', 'cruz, fé, redenção, santidade, segurança', 'cruz, louvor', 'cruz, louvor, oração, redenção', 'cruz, louvor, oração, redenção, segurança', 'cruz, louvor, redenção', 'cruz, louvor, redenção, santidade', 'cruz, louvor, redenção, segurança', 'cruz, oração, redenção', 'cruz, oração, redenção, segurança', 'cruz, redenção', 'cruz, redenção, santidade', 'cruz, santidade, segurança', 'esperança', 'esperança, fé, louvor, oração, redenção, segurança', 'esperança, fé, louvor, redenção', 'esperança, fé, louvor, redenção, santidade', 'esperança, fé, louvor, redenção, segurança', 'esperança, fé, oração, redenção', 'esperança, fé, oração, segurança', 'esperança, fé, redenção', 'esperança, fé, redenção, santidade', 'esperança, fé, redenção, santidade, segurança', 'esperança, fé, santidade', 'esperança, louvor', 'esperança, louvor, oração', 'esperança, louvor, oração, redenção', 'esperança, louvor, oração, redenção, santidade', 'esperança, louvor, oração, redenção, segurança', 'esperança, louvor, oração, santidade', 'esperança, louvor, redenção', 'esperança, louvor, redenção, santidade', 'esperança, louvor, redenção, santidade, segurança', 'esperança, louvor, redenção, segurança', 'esperança, oração, redenção', 'esperança, oração, redenção, santidade', 'esperança, oração, redenção, santidade, segurança', 'esperança, oração, redenção, segurança', 'esperança, oração, segurança', 'esperança, redenção', 'esperança, redenção, santidade', 'esperança, redenção, santidade, segurança', 'esperança, redenção, segurança', 'esperança, santidade', 'esperança, segurança', 'fé', 'fé, louvor, oração, redenção, santidade, segurança', 'fé, louvor, oração, redenção, segurança', 'fé, louvor, redenção, santidade', 'fé, louvor, redenção, segurança', 'fé, louvor, segurança', 'fé, oração', 'fé, oração, redenção', 'fé, oração, redenção, segurança', 'fé, oração, segurança', 'fé, redenção', 'fé, redenção, santidade', 'fé, redenção, santidade, segurança', 'fé, redenção, segurança', 'justiça, oração, fidelidade, santidade', 'louvor', 'louvor, oração, redenção', 'louvor, oração, redenção, santidade', 'louvor, oração, redenção, segurança', 'louvor, redenção', 'louvor, redenção, santidade', 'louvor, redenção, santidade, segurança', 'louvor, redenção, segurança', 'louvor, santidade', 'oração, redenção', 'oração, redenção, santidade', 'oração, redenção, segurança', 'oração, santidade', 'oração, segurança', 'redenção', 'redenção, santidade', 'redenção, santidade, segurança', 'redenção, segurança', 'santidade', 'segurança', 'trindade, adoração, louvor, santidade']
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
        h.tema && h.tema.toLowerCase().includes(tema.toLowerCase())
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
