class GerenciadorCurriculos {
  constructor(listaId, filtroNomeId, filtroAreaId) {
    this.listaCurriculos = document.getElementById(listaId);
    this.filtroInput = document.getElementById(filtroNomeId);
    this.filtroArea = document.getElementById(filtroAreaId);

    this.adicionarBotaoApagar();

    this.filtroInput.addEventListener("input", () => this.carregarCurriculos());
    this.filtroArea.addEventListener("change", () => this.carregarCurriculos());

    this.popularFiltroDeArea(); // Preencher o select com as áreas existentes
    this.carregarCurriculos();
  }

  obterCurriculos() {
    return JSON.parse(localStorage.getItem("curriculos")) || [];
  }

  obterAreasUnicas() {
    const curriculos = this.obterCurriculos();
    const areas = curriculos.map(c => c.area);
    return [...new Set(areas)].sort();
  }

  popularFiltroDeArea() {
    const areas = this.obterAreasUnicas();
    this.filtroArea.innerHTML = ''; // Limpa antes de preencher

    const optionInicial = document.createElement("option");
    optionInicial.value = "";
    optionInicial.textContent = "Todas as Áreas";
    this.filtroArea.appendChild(optionInicial);

    areas.forEach(area => {
      const option = document.createElement("option");
      option.value = area;
      option.textContent = area;
      this.filtroArea.appendChild(option);
    });
  }

  filtrarCurriculos(curriculos, filtroNome, filtroArea) {
    return curriculos.filter(curriculo => {
      const nomeMatch = curriculo.nomePessoa.toLowerCase().includes(filtroNome.toLowerCase());
      const areaMatch = filtroArea === "" || curriculo.area === filtroArea;
      return nomeMatch && areaMatch;
    });
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

  carregarCurriculos() {
    this.listaCurriculos.innerHTML = "";
    const curriculos = this.obterCurriculos();
    const nomeFiltro = this.filtroInput.value;
    const areaFiltro = this.filtroArea.value;

    const curriculosFiltrados = this.filtrarCurriculos(curriculos, nomeFiltro, areaFiltro);

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
        this.popularFiltroDeArea(); // Atualiza o select após apagar
        this.carregarCurriculos();
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new GerenciadorCurriculos("lista-curriculos", "filtro-nome", "filtro-area");
});
