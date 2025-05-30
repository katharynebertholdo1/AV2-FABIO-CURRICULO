document.addEventListener("DOMContentLoaded", () => {
  const listaCurriculos = document.getElementById("lista-curriculos");
  const filtroInput = document.getElementById("filtro-nome");

  // Função para carregar a lista de currículos, com opção de filtro
  function carregarCurriculos(filtro = "") {
    listaCurriculos.innerHTML = ""; // Limpa a lista atual
    const curriculos = JSON.parse(localStorage.getItem("curriculos")) || [];

    const curriculosFiltrados = curriculos.filter(curriculo =>
      curriculo.nomePessoa.toLowerCase().includes(filtro.toLowerCase())
    );

    if (curriculosFiltrados.length === 0) {
      listaCurriculos.innerHTML = "<p>Nenhum currículo encontrado.</p>";
      return;
    }

    curriculosFiltrados.forEach(curriculo => {
      const card = document.createElement("div");
      card.classList.add("curriculo-card");
      card.innerHTML = `
        <h2>${curriculo.nome}</h2>
        <p><strong>Nome da Pessoa:</strong> ${curriculo.nomePessoa}</p>
        <p><strong>Área:</strong> ${curriculo.area}</p>
        <p><strong>Experiência:</strong> ${curriculo.experiencia}</p>
      `;
      listaCurriculos.appendChild(card);
    });
  }

  // Botão de apagar currículos
  const apagarBtn = document.createElement("button");
  apagarBtn.id = "apagarCurriculos";
  apagarBtn.textContent = "Apagar Currículos";
  apagarBtn.classList.add("btn-apagar");
  listaCurriculos.parentElement.insertBefore(apagarBtn, listaCurriculos);

  apagarBtn.addEventListener("click", () => {
    if (confirm("Tem certeza que deseja apagar todos os currículos?")) {
      localStorage.removeItem("curriculos");
      alert("Todos os currículos foram apagados.");
      carregarCurriculos(); // Recarrega a lista vazia
    }
  });

  // Evento para filtrar currículos conforme o texto digitado
  filtroInput.addEventListener("input", () => {
    carregarCurriculos(filtroInput.value);
  });

  // Carrega todos os currículos inicialmente
  carregarCurriculos();
});
