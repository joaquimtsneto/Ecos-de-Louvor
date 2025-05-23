
document.addEventListener("DOMContentLoaded", () => {
  const hinarios = {
    'Cantor Cristão': 'cantor_cristao.json',
    'Cânticos': 'canticos.json',
    'Espanhol': 'espanol.json'
  };

  const botaoMostrarTodos = document.querySelector('button[onclick*="mostrarTodos"]');
  if (botaoMostrarTodos) botaoMostrarTodos.textContent = "todos";

  let hinos = [];
  let hinosFiltrados = [];

  function exibirHinos(lista) {
    const container = document.getElementById("letra-container");
    container.innerHTML = "";
    lista.forEach(hino => {
      const div = document.createElement("div");
      div.className = "hino";
      div.innerHTML = `<h2>${hino.numero}. ${hino.titulo}</h2><pre>${hino.letra}</pre>`;
      container.appendChild(div);
    });
  }

  window.carregarHinario = (nome) => {
    const caminho = hinarios[nome];
    fetch(caminho)
      .then(res => res.json())
      .then(data => {
        hinos = data;
        hinosFiltrados = data;
        exibirHinos(hinosFiltrados);
      })
      .catch(err => {
        document.getElementById("letra-container").innerHTML = "<p>Erro ao carregar hinos.</p>";
        console.error("Erro ao carregar:", err);
      });
  };

  window.filtrarHinos = (termo) => {
    termo = termo.toLowerCase();
    hinosFiltrados = hinos.filter(h => 
      h.titulo.toLowerCase().includes(termo) ||
      h.numero.toString().includes(termo)
    );
    exibirHinos(hinosFiltrados);
  };

  document.getElementById("search").addEventListener("input", e => {
    filtrarHinos(e.target.value);
  });

  carregarHinario("Cantor Cristão"); // carregamento inicial
});
