
let todosHinos = [];
let hinarioAtual = "canticos.json";

document.addEventListener("DOMContentLoaded", () => {
  carregarHinos(hinarioAtual);

  document.getElementById("btn-todos").addEventListener("click", () => {
    exibirHinos(todosHinos);
    atualizarBotoesAtivos("btn-todos");
  });

  document.getElementById("btn-canticos").addEventListener("click", () => {
    hinarioAtual = "canticos.json";
    carregarHinos(hinarioAtual);
    atualizarBotoesAtivos("btn-canticos");
  });

  document.getElementById("btn-cantor").addEventListener("click", () => {
    hinarioAtual = "cantor_cristao.json";
    carregarHinos(hinarioAtual);
    atualizarBotoesAtivos("btn-cantor");
  });

  const searchInput = document.querySelector("input[type='text']");
  searchInput.addEventListener("input", () => {
    const termo = searchInput.value.toLowerCase();
    const resultados = todosHinos.filter(h =>
      (h.numero + " - " + h.titulo).toLowerCase().includes(termo)
    );
    exibirHinos(resultados);
  });
});

function atualizarBotoesAtivos(ativoId) {
  const botoes = document.querySelectorAll(".buttons button");
  botoes.forEach(btn => {
    btn.classList.remove("active", "todos-ativo");
    if (btn.id === ativoId) {
      btn.classList.add(ativoId === "btn-todos" ? "todos-ativo" : "active");
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
        letra: h.letra || ""
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
    bloco.className = "hino-bloco";
    