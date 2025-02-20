window.addEventListener("load", function () {
    let fotos = JSON.parse(localStorage.getItem("fotos"));
    if (!fotos || !fotos.length) {
        fotos = [
            "../static/images/piscina.jpg",
            "../static/images/recepcao.jpg",
        ];
        localStorage.setItem("fotos", JSON.stringify(fotos));
    }
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
    initializeSlider();

    let servicos = JSON.parse(localStorage.getItem("servicos"));
    if (!servicos || !Array.isArray(servicos) || servicos.length === 0) {
        servicos = ["Lavanderia", "Academia", "Restaurante", "Wi-Fi Grátis"];
        localStorage.setItem("servicos", JSON.stringify(servicos));
    }
    const listaServicos = document.getElementById("listaServicos");
    if (listaServicos) {
        listaServicos.innerHTML = "";
        servicos.forEach(function (servico) {
            const li = document.createElement("li");
            li.textContent = servico;
            listaServicos.appendChild(li);
        });
    }

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
function initializeSlider() {
    let fotos = JSON.parse(localStorage.getItem("fotos"));
    let quartos = JSON.parse(localStorage.getItem("quartos")) || [];
    const roomPhotos = quartos.map((room) => room.foto).filter((foto) => foto);
    let allImages = fotos.concat(roomPhotos);
    allImages = [...new Set(allImages)];
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
function showSlide(index) {
    const slides = document.querySelectorAll(".slides img");
    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
    });
}
function nextSlide() {
    const slides = document.querySelectorAll(".slides img");
    sliderCurrentIndex = (sliderCurrentIndex + 1) % slides.length;
    showSlide(sliderCurrentIndex);
}
function prevSlide() {
    const slides = document.querySelectorAll(".slides img");
    sliderCurrentIndex =
        (sliderCurrentIndex - 1 + slides.length) % slides.length;
    showSlide(sliderCurrentIndex);
}
let sliderCurrentIndex = 0;
let sliderInterval = setInterval(nextSlide, 5000);
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
document.getElementById("reservaForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const entrada = document.getElementById("entrada").value;
    const saida = document.getElementById("saida").value;
    if (entrada && saida) {
        const msg =
            "Reserva realizada de " +
            formatDate(entrada) +
            " a " +
            formatDate(saida);
        document.getElementById("reservaMsg").innerText = msg;
        const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
        reservas.push({ entrada: entrada, saida: saida });
        localStorage.setItem("reservas", JSON.stringify(reservas));
    }
});
function formatDate(dateStr) {
    const parts = dateStr.split("-");
    return parts[2] + "-" + parts[1] + "-" + parts[0];
}
