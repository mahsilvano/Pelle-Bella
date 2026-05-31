const botaoMenu = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-bar");

botaoMenu.addEventListener("click", () => {
    menu.classList.toggle("ativo");
});

const servicosBtn = document.querySelector(".servicos-btn");
const dropdown = document.querySelector(".menu-dropdown");

servicosBtn.addEventListener("click", (e) => {

    if(window.innerWidth <= 768){
        e.preventDefault();
        dropdown.classList.toggle("aberto");
    }

});