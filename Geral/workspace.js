document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-curriculo");
    const confirmacaoDiv = document.getElementById("confirmacao");
    const nomeCurriculoInput = document.getElementById("nomeCurriculoInput");
    const btnConfirmar = document.getElementById("btnConfirmar");
    // Removido: const listaCurriculos = document.getElementById("lista-curriculos");

    let formData = {};

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        const nome = document.getElementById("nome").value.trim();
        const area = document.getElementById("area").value;
        const experiencia = document.getElementById("experiencia").value;

        formData = { nome, area, experiencia };
        console.log("Form Data:", formData);
        confirmacaoDiv.style.display = 'block';
    });

    btnConfirmar.addEventListener("click", () => {
        let curriculos = JSON.parse(localStorage.getItem("curriculos")) || [];
        let nomeEscolhido = nomeCurriculoInput.value.trim();

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
            nomePessoa: formData.nome, // <-- Aqui!
            area: formData.area,
            experiencia: formData.experiencia
        };

        curriculos.push(novoCurriculo);
        localStorage.setItem("curriculos", JSON.stringify(curriculos));

        alert(`Currículo "${nomeEscolhido}" salvo com sucesso!`);

        confirmacaoDiv.style.display = 'none';
        nomeCurriculoInput.value = "";
        form.reset();

        // Removido: carregarCurriculos(); // Não chamar aqui, pois não há lista para carregar nesta página
    });

    // Removido toda a definição da função carregarCurriculos e o código do botão de apagar
    // Esses elementos pertencem exclusivamente ao meuscurriculos.js
});
