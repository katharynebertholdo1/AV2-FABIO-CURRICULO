class CurriculoApp {
    constructor() {
        this.form = document.getElementById("form-curriculo");
        this.confirmacaoDiv = document.getElementById("confirmacao");
        this.nomeCurriculoInput = document.getElementById("nomeCurriculoInput");
        this.btnConfirmar = document.getElementById("btnConfirmar");

        this.formData = {};

        this.initEventListeners();
    }

    initEventListeners() {
        this.form.addEventListener("submit", (event) => this.handleFormSubmit(event));
        this.btnConfirmar.addEventListener("click", () => this.confirmarCurriculo());
    }

    handleFormSubmit(event) {
        event.preventDefault();

        if (!this.form.checkValidity()) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        const nome = document.getElementById("nome").value.trim();
        const area = document.getElementById("area").value;
        const experiencia = document.getElementById("experiencia").value;

        this.formData = { nome, area, experiencia };
        console.log("Form Data:", this.formData);

        this.confirmacaoDiv.style.display = 'block';
    }

    confirmarCurriculo() {
        let curriculos = JSON.parse(localStorage.getItem("curriculos")) || [];
        let nomeEscolhido = this.nomeCurriculoInput.value.trim();

        const nomesExistentes = curriculos.map(c => c.nome);

        if (!nomeEscolhido) {
            let contador = 1;
            while (nomesExistentes.includes(`Curriculo ${contador}`)) {
                contador++;
            }
            nomeEscolhido = `Curriculo ${contador}`;
            alert(`Nenhum nome inserido. Será usado: ${nomeEscolhido}`);
        } else if (nomesExistentes.includes(nomeEscolhido)) {
            alert("Já existe um currículo com esse nome. Escolha outro.");
            return;
        }

        const novoCurriculo = {
            nome: nomeEscolhido,
            nomePessoa: this.formData.nome,
            area: this.formData.area,
            experiencia: this.formData.experiencia
        };

        curriculos.push(novoCurriculo);
        localStorage.setItem("curriculos", JSON.stringify(curriculos));

        alert(`Currículo "${nomeEscolhido}" salvo com sucesso!`);

        this.resetForm();
    }

    resetForm() {
        this.confirmacaoDiv.style.display = 'none';
        this.nomeCurriculoInput.value = "";
        this.form.reset();
    }
}

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
    new CurriculoApp();
});
