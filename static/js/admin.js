let editingQuartoIndex = null;
let editingReservaIndex = null;

// Processa o formulário de login do admin
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    // Verifica se as credenciais são válidas
    if (usuario === "admin" && senha === "admin") {
        // Esconde a tela de login e mostra a área administrativa
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("adminContainer").style.display = "block";
        // Carrega os dados
        carregarFotos();
        carregarServicos();
        carregarQuartos();
        carregarReservas();
    } else {
        // Exibe mensagem de credenciais inválidas
        const loginMsg = document.getElementById("loginMsg");
        loginMsg.innerText = "Credenciais inválidas";
        loginMsg.style.opacity = 1;
        setTimeout(function () {
            loginMsg.style.transition = "opacity 1s";
            loginMsg.style.opacity = 0;
        }, 3000);
        setTimeout(function () {
            loginMsg.innerText = "";
            loginMsg.style.transition = "";
        }, 4000);
    }
});

// Botão de logout: volta para a tela de login
document.getElementById("btnLogout").addEventListener("click", function () {
    document.getElementById("adminContainer").style.display = "none";
    document.getElementById("loginContainer").style.display = "block";
});

// Configura os botões do menu do admin para exibir a seção escolhida
document.getElementById("btnFotos").addEventListener("click", function () {
    mostrarSeccao("secFotos");
});
document.getElementById("btnServicos").addEventListener("click", function () {
    mostrarSeccao("secServicos");
});
document.getElementById("btnQuartos").addEventListener("click", function () {
    mostrarSeccao("secQuartos");
});
document.getElementById("btnReservas").addEventListener("click", function () {
    mostrarSeccao("secReservas");
    carregarReservas();
});

// Função que oculta todas as seções e exibe apenas a indicada
function mostrarSeccao(id) {
    document.getElementById("secFotos").style.display = "none";
    document.getElementById("secServicos").style.display = "none";
    document.getElementById("secQuartos").style.display = "none";
    document.getElementById("secReservas").style.display = "none";
    document.getElementById(id).style.display = "block";
}

// Processa o formulário para adicionar uma nova foto
document.getElementById("addFotoForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const url = document.getElementById("fotoUrl").value;
    let fotos = JSON.parse(localStorage.getItem("fotos")) || [];
    fotos.push(url);
    localStorage.setItem("fotos", JSON.stringify(fotos));
    carregarFotos();
    document.getElementById("fotoUrl").value = "";
});

// Função para carregar as fotos na seção Fotos
function carregarFotos() {
    let fotos = JSON.parse(localStorage.getItem("fotos"));
    if (!fotos || !Array.isArray(fotos)) {
        fotos = [];
        localStorage.setItem("fotos", JSON.stringify(fotos));
    }
    const fotosList = document.getElementById("fotosList");
    fotosList.innerHTML = "";
    fotos.forEach(function (url, index) {
        const div = document.createElement("div");
        const img = document.createElement("img");
        img.src = url;
        img.style.width = "200px";
        const btn = document.createElement("button");
        btn.innerText = "Remover";
        btn.addEventListener("click", function () {
            fotos.splice(index, 1);
            localStorage.setItem("fotos", JSON.stringify(fotos));
            carregarFotos();
        });
        div.appendChild(img);
        div.appendChild(btn);
        fotosList.appendChild(div);
    });
}

// Processa o formulário para adicionar um novo serviço
document
    .getElementById("addServicoForm")
    .addEventListener("submit", function (e) {
        e.preventDefault();
        const servico = document.getElementById("servicoNome").value;
        let servicos = JSON.parse(localStorage.getItem("servicos")) || [];
        servicos.push(servico);
        localStorage.setItem("servicos", JSON.stringify(servicos));
        carregarServicos();
        document.getElementById("servicoNome").value = "";
    });

// Função para carregar os serviços na seção Serviços
function carregarServicos() {
    let servicos = JSON.parse(localStorage.getItem("servicos"));
    if (!servicos) {
        servicos = ["Lavanderia", "Academia", "Restaurante", "Wi-Fi Grátis"];
        localStorage.setItem("servicos", JSON.stringify(servicos));
    }
    const servicosList = document.getElementById("servicosList");
    servicosList.innerHTML = "";
    servicos.forEach(function (servico, index) {
        const li = document.createElement("li");
        li.textContent = servico;
        const btn = document.createElement("button");
        btn.innerText = "Remover";
        btn.addEventListener("click", function () {
            servicos.splice(index, 1);
            localStorage.setItem("servicos", JSON.stringify(servicos));
            carregarServicos();
        });
        li.appendChild(btn);
        servicosList.appendChild(li);
    });
}

// Processa o formulário para adicionar um novo quarto
document
    .getElementById("addQuartoForm")
    .addEventListener("submit", function (e) {
        e.preventDefault();
        const nome = document.getElementById("quartoNome").value;
        const descricao = document.getElementById("quartoDescricao").value;
        const preco = document.getElementById("quartoPreco").value;
        const foto = document.getElementById("quartoFoto").value;
        let quartos = JSON.parse(localStorage.getItem("quartos")) || [];
        quartos.push({
            nome: nome,
            descricao: descricao,
            preco: preco,
            foto: foto,
        });
        localStorage.setItem("quartos", JSON.stringify(quartos));
        carregarQuartos();
        document.getElementById("quartoNome").value = "";
        document.getElementById("quartoDescricao").value = "";
        document.getElementById("quartoPreco").value = "";
        document.getElementById("quartoFoto").value = "";
    });

// Função para carregar os quartos na seção Quartos
function carregarQuartos() {
    let quartos = JSON.parse(localStorage.getItem("quartos"));
    if (!quartos || !Array.isArray(quartos) || quartos.length === 0) {
        // Se não houver quartos, insere os padrão
        quartos = [
            {
                nome: "Quarto Standard",
                descricao: "Conforto e praticidade com preços acessíveis",
                preco: 200.0,
                foto: "../static/images/quartos/standard.jpg",
            },
            {
                nome: "Quarto Deluxe",
                descricao: "Mais espaço e comodidades",
                preco: 350.0,
                foto: "../static/images/quartos/deluxe.jpg",
            },
            {
                nome: "Suíte",
                descricao: "O melhor em luxo e conforto",
                preco: 500.0,
                foto: "../static/images/quartos/suite.jpg",
            },
        ];
        localStorage.setItem("quartos", JSON.stringify(quartos));
    }
    const quartosList = document.getElementById("quartosList");
    quartosList.innerHTML = "";
    quartos.forEach(function (quarto, index) {
        const div = document.createElement("div");
        div.className = "quartoItem";
        const precoFormatado = Number(quarto.preco)
            .toFixed(2)
            .replace(".", ",");
        const span = document.createElement("span");
        span.textContent =
            quarto.nome +
            " - " +
            quarto.descricao +
            " - R$" +
            precoFormatado +
            " por noite";
        const btnEdit = document.createElement("button");
        btnEdit.innerText = "Editar";
        btnEdit.addEventListener("click", function () {
            editingQuartoIndex = index;
            document.getElementById("editQuartoNome").value = quarto.nome;
            document.getElementById("editQuartoDescricao").value =
                quarto.descricao;
            document.getElementById("editQuartoPreco").value = String(
                quarto.preco
            );
            document.getElementById("editQuartoFoto").value = quarto.foto;
            document.getElementById("modalQuarto").classList.add("active");
        });
        const btnRem = document.createElement("button");
        btnRem.innerText = "Remover";
        btnRem.addEventListener("click", function () {
            quartos.splice(index, 1);
            localStorage.setItem("quartos", JSON.stringify(quartos));
            carregarQuartos();
        });
        const divBtns = document.createElement("div");
        divBtns.className = "btns";
        divBtns.appendChild(btnEdit);
        divBtns.appendChild(btnRem);
        div.appendChild(span);
        div.appendChild(divBtns);
        quartosList.appendChild(div);
    });
}

// Processa o formulário para editar um quarto existente
document
    .getElementById("formEditarQuarto")
    .addEventListener("submit", function (e) {
        e.preventDefault();
        const nome = document.getElementById("editQuartoNome").value;
        const descricao = document.getElementById("editQuartoDescricao").value;
        const preco = document.getElementById("editQuartoPreco").value;
        const foto = document.getElementById("editQuartoFoto").value;
        let quartos = JSON.parse(localStorage.getItem("quartos"));
        if (editingQuartoIndex !== null) {
            quartos[editingQuartoIndex] = {
                nome: nome,
                descricao: descricao,
                preco: preco,
                foto: foto,
            };
            localStorage.setItem("quartos", JSON.stringify(quartos));
            carregarQuartos();
            document.getElementById("modalQuarto").classList.remove("active");
            editingQuartoIndex = null;
        }
    });
document
    .getElementById("cancelarQuarto")
    .addEventListener("click", function () {
        document.getElementById("modalQuarto").classList.remove("active");
        editingQuartoIndex = null;
    });

// Processa o formulário para editar uma reserva
document
    .getElementById("formEditarReserva")
    .addEventListener("submit", function (e) {
        e.preventDefault();
        const entrada = document.getElementById("editReservaEntrada").value;
        const saida = document.getElementById("editReservaSaida").value;
        let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
        if (editingReservaIndex !== null) {
            reservas[editingReservaIndex] = { entrada: entrada, saida: saida };
            localStorage.setItem("reservas", JSON.stringify(reservas));
            carregarReservas();
            document.getElementById("modalReserva").classList.remove("active");
            editingReservaIndex = null;
        }
    });
document
    .getElementById("cancelarReserva")
    .addEventListener("click", function () {
        document.getElementById("modalReserva").classList.remove("active");
        editingReservaIndex = null;
    });

// Função para carregar as reservas na seção Reservas
function carregarReservas() {
    let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    const reservasList = document.getElementById("reservasList");
    reservasList.innerHTML = "";
    reservas.forEach(function (reserva, index) {
        const div = document.createElement("div");
        div.className = "reservaItem";
        const details = document.createElement("span");
        details.textContent =
            "Reserva: " +
            formatDate(reserva.entrada) +
            " a " +
            formatDate(reserva.saida);
        div.appendChild(details);
        const btnContainer = document.createElement("div");
        btnContainer.className = "btns";
        const btnEdit = document.createElement("button");
        btnEdit.innerText = "Editar";
        btnEdit.addEventListener("click", function () {
            editingReservaIndex = index;
            document.getElementById("editReservaEntrada").value =
                reserva.entrada;
            document.getElementById("editReservaSaida").value = reserva.saida;
            document.getElementById("modalReserva").classList.add("active");
        });
        const btnRemove = document.createElement("button");
        btnRemove.innerText = "Remover";
        btnRemove.addEventListener("click", function () {
            reservas.splice(index, 1);
            localStorage.setItem("reservas", JSON.stringify(reservas));
            carregarReservas();
        });
        btnContainer.appendChild(btnEdit);
        btnContainer.appendChild(btnRemove);
        div.appendChild(btnContainer);
        reservasList.appendChild(div);
    });
}

// Função para formatar datas do formato yyyy-mm-dd para dd-mm-yyyy
function formatDate(dateStr) {
    const parts = dateStr.split("-");
    return parts[2] + "/" + parts[1] + "/" + parts[0];
}
