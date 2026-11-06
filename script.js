// BUSCA NO ELENCO
const busca = document.getElementById('busca-elenco');
const itens = document.querySelectorAll('#lista-elenco li');
if (busca) {
  busca.addEventListener('input', () => {
    const termo = busca.value.trim().toLowerCase();
    itens.forEach(li => {
      li.hidden = !li.textContent.toLowerCase().includes(termo);
    });
  });
}

// VOLTAR AO TOPO
const topo = document.getElementById('topo');
if (topo) {
  window.addEventListener('scroll', () => {
    topo.classList.toggle('visivel', window.scrollY > 600);
  });
  topo.addEventListener('click', () => window.scrollTo({ top: 0 }));
}