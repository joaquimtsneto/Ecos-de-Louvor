
let todosHinos = [];
let hinarioAtual = "canticos.json";

// Carregar hinos ao iniciar
document.addEventListener("DOMContentLoaded", () => {
  carregarHinos(hinarioAtual);

  
  const botoes = document.querySelectorAll(".buttons button");
  botoes.forEach(btn => {
    btn.classList.remove("active");
  });
  
  const botoes = document.querySelectorAll(".buttons button");
  botoes.forEach(btn => {
    btn.classList.remove("active", "todos-ativo");
  });
  document.querySelectorAll(".buttons button").forEach(btn => {


    btn.addEventListener("click", () => {
    botoes.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
      if (btn.textContent === "Mostrar todos") {
    btn.classList.add('todos-ativo');
        exibirHinos(todosHinos);
      } else if (btn.textContent === "Cânticos") {
        hinarioAtual = "canticos.json";
        carregarHinos(hinarioAtual);
      } else if (btn.textContent === "Cantor Cristão") {
        hinarioAtual = "cantor_cristao.json";
        carregarHinos(hinarioAtual);
      }
    });
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
    bloco.style.margin = "20px auto";
    bloco.style.maxWidth = "700px";
    bloco.style.textAlign = "left";
    bloco.style.borderBottom = "1px solid #ccc";
    bloco.style.paddingBottom = "10px";
    bloco.innerHTML = `<h3>${h.numero} - ${h.titulo}</h3><pre style="white-space:pre-wrap">${h.letra}</pre>`;
    container.appendChild(bloco);
  });
}
