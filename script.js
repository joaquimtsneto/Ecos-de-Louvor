
let hinos = {};
let atual = "Mostrar todos";

// Carregar os dois arquivos e juntar os dados
Promise.all([
  fetch('canticos.json').then(r => r.json()),
  fetch('cantor_cristao.json').then(r => r.json())
]).then(([canticos, cantorCristao]) => {
  hinos = {
    "Cânticos": canticos,
    "Cantor Cristão": cantorCristao
  };

  const botoes = document.getElementById('botoes');
  const categorias = ['Mostrar todos', ...Object.keys(hinos)];

  categorias.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.style.margin = '0.25rem';
    btn.onclick = () => {
      atual = cat;
      render(document.getElementById('busca').value);
    };
    botoes.appendChild(btn);
  });

  render('');
});

function render(filtro) {
  const lista = document.getElementById('lista');
  lista.innerHTML = '';

  const ativos = atual === 'Mostrar todos'
    ? Object.values(hinos).flat()
    : hinos[atual] || [];

  const resultado = ativos.filter(h =>
    h.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
    h.numero.toString().includes(filtro)
  );

  resultado.forEach(h => {
    const bloco = document.createElement('div');
    bloco.style.border = '1px solid #ccc';
    bloco.style.borderRadius = '0.5rem';
    bloco.style.padding = '1rem';
    bloco.style.marginBottom = '1rem';
    bloco.innerHTML = `<h2 style="color:#1e40af; font-size:1.2rem;">${h.numero}. ${h.titulo}</h2><pre style="white-space:pre-wrap;">${h.letra}</pre>`;
    lista.appendChild(bloco);
  });
}

document.getElementById('busca').addEventListener('input', e => render(e.target.value));
