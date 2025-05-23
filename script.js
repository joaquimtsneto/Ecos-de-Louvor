
let hinos = [];
let todosHinos = [];
let temaSelecionado = "";
let pagina = 0;
const porPagina = 1000;

function carregarHinos() {
  const hinario = document.getElementById("hinarioSelect").value;
  mostrarCarregando();
  fetch(hinario === "Cânticos" ? "canticos.json" : "cantor_cristao.json")
    .then(response => response.json())
    .then(data => {
      todosHinos = data.map(h => ({
        numero: h.numero || h["número"] || "",
        titulo: h.titulo || h["título"] || "",
        categoria: h.categoria || "",
        letra: h.letra || "",
        tema: h.tema || ""
      }));
      temaSelecionado = "";
      document.getElementById("searchInput").value = "";
      gerarTemas(todosHinos);
      aplicarFiltros();
    });
}

function mostrarCarregando() {
  const container = document.getElementById('hinosContainer');
  container.innerHTML = '<p style="text-align:center;font-size:1.2em;">⏳ Carregando hinos...</p>';
}

function gerarTemas(hinos) {
  const temasSet = new Set();
  hinos.forEach(h => {
    if (h.tema) {
      h.tema.split(',').forEach(t => temasSet.add(t.trim()));
    }
  });
  const temas = Array.from(temasSet).sort();
  const container = document.getElementById('temasContainer');
  container.innerHTML = '';
  temas.forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'tema-btn' + (t === temaSelecionado ? ' ativo' : '');
    btn.textContent = t;
    btn.onclick = () => {
      temaSelecionado = (temaSelecionado === t ? "" : t);
      gerarTemas(todosHinos);
      aplicarFiltros();
    };
    container.appendChild(btn);
  });
}

function searchHinos() {
  temaSelecionado = "";
  gerarTemas(todosHinos);
  aplicarFiltros();
}

function aplicarFiltros() {
  const termo = document.getElementById('searchInput').value.toLowerCase();
  let filtrados = todosHinos;

  if (temaSelecionado) {
    filtrados = filtrados.filter(h => (h.tema || "").toLowerCase().includes(temaSelecionado.toLowerCase()));
  }

  if (termo) {
    filtrados = filtrados.filter(h =>
      (h.numero || "").toLowerCase().includes(termo) ||
      (h.titulo || "").toLowerCase().includes(termo) ||
      (h.letra || "").toLowerCase().includes(termo)
    );
  }

  hinos = filtrados;
  pagina = 0;
  document.getElementById("hinosContainer").innerHTML = "";
  mostrarMais();
}

function mostrarMais() {
  const container = document.getElementById('hinosContainer');
  const inicio = pagina * porPagina;
  const fim = inicio + porPagina;
  const trecho = hinos.slice(inicio, fim);
  trecho.forEach(hino => {
    const div = document.createElement('div');
    div.className = 'hino';
    const letraFormatada = (hino.letra || "").replace(/\n/g, '<br>');
    div.innerHTML = `<h2>${hino.numero}. ${hino.titulo}</h2><p>${letraFormatada}</p>`;
    container.appendChild(div);
  });
  pagina++;
  document.getElementById("btnMais").style.display = (fim >= hinos.length) ? "none" : "inline-block";
}

carregarHinos();
