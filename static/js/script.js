// Configura os dados iniciais e inicializa os elementos quando a página é carregada
window.addEventListener("load", function () {
    // Verifica e se não houver nenhuma, insere imagens padrão
    let fotos = JSON.parse(localStorage.getItem("fotos"));
    if (!fotos || !fotos.length) {
        fotos = [
            "../static/images/piscina.jpg",
            "../static/images/recepcao.jpg",
        ];
        localStorage.setItem("fotos", JSON.stringify(fotos));
    }

    // Verifica e se não houver nenhum, insere os quartos padrões
    let quartos = JSON.parse(localStorage.getItem("quartos"));
    if (!quartos || !Array.isArray(quartos) || quartos.length === 0) {
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

    // Inicializa o slider da galeria
    initializeSlider();

    // Verifica e insere os serviços padrões se não houver nenhum
    let servicos = JSON.parse(localStorage.getItem("servicos"));
    if (!servicos || !Array.isArray(servicos) || servicos.length === 0) {
        servicos = ["Lavanderia", "Academia", "Restaurante", "Wi-Fi Grátis"];
        localStorage.setItem("servicos", JSON.stringify(servicos));
    }

    // Preenche a lista de serviços na página
    const listaServicos = document.getElementById("listaServicos");
    if (listaServicos) {
        listaServicos.innerHTML = "";
        servicos.forEach(function (servico) {
            const li = document.createElement("li");
            li.textContent = servico;
            listaServicos.appendChild(li);
        });
    }

    // Preenche a seção de quartos na página principal
    const listaQuartos = document.getElementById("listaQuartos");
    if (listaQuartos) {
        listaQuartos.innerHTML = "";
        quartos.forEach(function (quarto) {
            const roomDiv = document.createElement("div");
            roomDiv.className = "room";
            const img = document.createElement("img");
            img.src = quarto.foto;
            img.alt = quarto.nome;
            const h3 = document.createElement("h3");
            h3.textContent = quarto.nome;
            const p = document.createElement("p");
            const precoFormatado = Number(quarto.preco)
                .toFixed(2)
                .replace(".", ",");
            p.textContent =
                quarto.descricao + " - R$" + precoFormatado + " por noite";
            roomDiv.appendChild(img);
            roomDiv.appendChild(h3);
            roomDiv.appendChild(p);
            listaQuartos.appendChild(roomDiv);
        });
    }
});

// Função para inicializar o slider da galeria
function initializeSlider() {
    let fotos = JSON.parse(localStorage.getItem("fotos"));
    let quartos = JSON.parse(localStorage.getItem("quartos")) || [];
    // Extrai as fotos dos quartos
    const roomPhotos = quartos.map((room) => room.foto).filter((foto) => foto);
    // Une as fotos gerais com as fotos dos quartos, garantindo que não haja repetições
    let allImages = fotos.concat(roomPhotos);
    allImages = [...new Set(allImages)];
    // Preenche o container do slider com as imagens
    const slidesContainer = document.querySelector(".slides");
    slidesContainer.innerHTML = "";
    allImages.forEach((url, index) => {
        const img = document.createElement("img");
        img.src = url;
        img.alt = "Foto " + (index + 1);
        if (index === 0) {
            img.classList.add("active");
        }
        slidesContainer.appendChild(img);
    });
    sliderCurrentIndex = 0;
}

// Função para exibir a imagem correta no slider
function showSlide(index) {
    const slides = document.querySelectorAll(".slides img");
    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
    });
}

// Função para avançar para a próxima imagem do slider
function nextSlide() {
    const slides = document.querySelectorAll(".slides img");
    sliderCurrentIndex = (sliderCurrentIndex + 1) % slides.length;
    showSlide(sliderCurrentIndex);
}

// Função para voltar para a imagem anterior do slider
function prevSlide() {
    const slides = document.querySelectorAll(".slides img");
    sliderCurrentIndex =
        (sliderCurrentIndex - 1 + slides.length) % slides.length;
    showSlide(sliderCurrentIndex);
}

let sliderCurrentIndex = 0;
// Avança automaticamente a cada 5 segundos
let sliderInterval = setInterval(nextSlide, 5000);

// Configura os botões de navegação do slider após o carregamento do DOM
document.addEventListener("DOMContentLoaded", function () {
    const leftArrow = document.querySelector(".arrow.left");
    const rightArrow = document.querySelector(".arrow.right");
    leftArrow.addEventListener("click", function () {
        clearInterval(sliderInterval);
        prevSlide();
        sliderInterval = setInterval(nextSlide, 5000);
    });
    rightArrow.addEventListener("click", function () {
        clearInterval(sliderInterval);
        nextSlide();
        sliderInterval = setInterval(nextSlide, 5000);
    });
});

// Processa o formulário de reserva
document.getElementById("reservaForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const entrada = document.getElementById("entrada").value;
    const saida = document.getElementById("saida").value;
    if (entrada && saida) {
        // Formata as datas para o formato dd-mm-yyyy
        const msg =
            "Reserva realizada de " +
            formatDate(entrada) +
            " até " +
            formatDate(saida);
        document.getElementById("reservaMsg").innerText = msg;
        // Armazena a reserva no localStorage
        const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
        reservas.push({ entrada: entrada, saida: saida });
        localStorage.setItem("reservas", JSON.stringify(reservas));
    }
});

// Função para formatar datas do formato yyyy-mm-dd para dd-mm-yyyy
function formatDate(dateStr) {
    const parts = dateStr.split("-");
    return parts[2] + "-" + parts[1] + "-" + parts[0];
}
