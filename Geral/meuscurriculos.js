class GerenciadorCurriculos {
  constructor(listaId, filtroId) {
    this.listaCurriculos = document.getElementById(listaId);
    this.filtroInput = document.getElementById(filtroId);

    this.adicionarBotaoApagar();
    this.filtroInput.addEventListener("input", () => this.carregarCurriculos(this.filtroInput.value));
    this.carregarCurriculos();
  }

  obterCurriculos() {
    return JSON.parse(localStorage.getItem("curriculos")) || [];
  }

  filtrarCurriculos(curriculos, filtro) {
    return curriculos.filter(curriculo =>
      curriculo.nomePessoa.toLowerCase().includes(filtro.toLowerCase())
    );
  }

  criarCard(curriculo) {
    const card = document.createElement("div");
    card.classList.add("curriculo-card");
    card.innerHTML = `
      <h2>${curriculo.nome}</h2>
      <p><strong>Nome da Pessoa:</strong> ${curriculo.nomePessoa}</p>
      <p><strong>Área:</strong> ${curriculo.area}</p>
      <p><strong>Experiência:</strong> ${curriculo.experiencia}</p>
    `;
    return card;
  }

  carregarCurriculos(filtro = "") {
    this.listaCurriculos.innerHTML = ""; // Limpa a lista
    const curriculos = this.obterCurriculos();
    const curriculosFiltrados = this.filtrarCurriculos(curriculos, filtro);

    if (curriculosFiltrados.length === 0) {
      this.listaCurriculos.innerHTML = "<p>Nenhum currículo encontrado.</p>";
      return;
    }

    curriculosFiltrados.forEach(curriculo => {
      const card = this.criarCard(curriculo);
      this.listaCurriculos.appendChild(card);
    });
  }

  adicionarBotaoApagar() {
    this.apagarBtn = document.createElement("button");
    this.apagarBtn.id = "apagarCurriculos";
    this.apagarBtn.textContent = "Apagar Currículos";
    this.apagarBtn.classList.add("btn-apagar");

    this.listaCurriculos.parentElement.insertBefore(this.apagarBtn, this.listaCurriculos);

    this.apagarBtn.addEventListener("click", () => {
      if (confirm("Tem certeza que deseja apagar todos os currículos?")) {
        localStorage.removeItem("curriculos");
        alert("Todos os currículos foram apagados.");
        this.carregarCurriculos();
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new GerenciadorCurriculos("lista-curriculos", "filtro-nome");
});
