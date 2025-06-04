
// FAVORITOS
const favoritosKey = "favoritos_hinos";
function getFavoritos() {
  return JSON.parse(localStorage.getItem(favoritosKey) || "[]");
}
function toggleFavorito(numero) {
  let favoritos = getFavoritos();
  if (favoritos.includes(numero)) {
    favoritos = favoritos.filter(n => n !== numero);
  } else {
    favoritos.push(numero);
  }
  localStorage.setItem(favoritosKey, JSON.stringify(favoritos));
  renderHinos(listaAtual); // Atualiza a visualização
}
function isFavorito(numero) {
  return getFavoritos().includes(numero);
}

// FUNÇÃO DE FILTRAGEM MELHORADA
function filtrarHinos(termo, listaHinos) {
  const termoLower = termo.toLowerCase().trim();

  // Se for número exato, retorna diretamente
  if (!isNaN(termoLower) && termoLower !== "") {
    const numero = parseInt(termoLower, 10);
    return listaHinos.filter(h => h.numero === numero);
  }

  // Caso contrário, procura no título ou na primeira estrofe
  return listaHinos.filter(h => {
    const titulo = h.titulo?.toLowerCase() || "";
    const letra = h.letra?.toLowerCase() || "";
    const primeiraLinha = letra.split('\n')[0] || "";
    return titulo.includes(termoLower) || primeiraLinha.includes(termoLower);
  });
}



let todosHinos = [];
let hinarioAtual = "canticos.json";
let temaAtual = "";

const temasPorHinario = {
  "canticos.json": ["adoração", "arrependimento", "batismo", "ceia do senhor", "cruz e sacrifício", "despertamento", "esperança", "evangelismo", "fé", "família", "gratidão", "igreja", "missões", "natal", "oração", "paz", "segunda vinda", "serviço cristão", "sofrimento e provações", "vitória em cristo"],
  "cantor_cristao.json": ["adoração", "arrependimento", "batismo", "ceia do senhor", "cruz e sacrifício", "despertamento", "esperança", "evangelismo", "fé", "família", "gratidão", "igreja", "missões", "natal", "oração", "paz", "segunda vinda", "serviço cristão", "sofrimento e provações", "vitória em cristo"]
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

document.getElementById('favoritosBtn').addEventListener('click', () => {
  const favoritos = getFavoritos();
  const filtrados = listaAtual.filter(h => favoritos.includes(parseInt(h.número)));
  renderHinos(filtrados);
});


// Código modificado para suportar cifras

function renderHino(hino) {
  const container = document.getElementById("letra-hino");
  container.innerHTML = "";

  const titulo = document.createElement("h2");
  titulo.textContent = `${hino.número} - ${hino.título}`;
  container.appendChild(titulo);

  let usandoCifras = false;
  const letra = document.createElement("pre");
  letra.style.whiteSpace = "pre-wrap";
  letra.style.fontFamily = "monospace";
  letra.textContent = hino.letra;

  if (hino.letra_cifrada) {
    const botao = document.createElement("button");
    botao.textContent = "Ver com cifras";
    botao.style.marginBottom = "10px";
    botao.onclick = () => {
      usandoCifras = !usandoCifras;
      letra.textContent = usandoCifras ? hino.letra_cifrada : hino.letra;
      botao.textContent = usandoCifras ? "Ver sem cifras" : "Ver com cifras";
    };
    container.appendChild(botao);
  }

  container.appendChild(letra);
}