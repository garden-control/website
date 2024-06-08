// estacao.js

// adicionar a query string aos links para as outras paginas de estacao
const urlParams = new URLSearchParams(window.location.search);
const idEstacao = urlParams.get("idEstacao");
document.getElementsByName("linkPainelLateral").forEach((element) => {
    element.setAttribute("href", 
        `${element.getAttribute("href")}?idEstacao=${idEstacao}`
    )
})

//Seleciona os itens clicado
var menuItem = document.querySelectorAll('.item-menu')

function selectLink(){
    menuItem.forEach((item)=>
        item.classList.remove('ativo')
    )
    this.classList.add('ativo')
}

menuItem.forEach((item)=>
    item.addEventListener('click', selectLink)
)

//Expandir o menu

var btnExp = document.querySelector('#btn-exp')
var menuSide = document.querySelector('.menu-lateral')

btnExp.addEventListener('click', function(){
    menuSide.classList.toggle('expandir')
})

