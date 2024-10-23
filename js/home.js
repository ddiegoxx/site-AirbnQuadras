const BASE_URL = 'http://3.224.210.59'
/*js para os efeitos da barra lateral */
let menuItem = document.querySelectorAll('.item-menu');
function selectLink(){
    menuItem.forEach((item) => 
        item.classList.remove('ativo')
    );
    this.classList.add('ativo')
}
menuItem.forEach((item) => 
    item.addEventListener('click', selectLink)
)

let btnExp = document.querySelector('#btn-exp')
let menuSide = document.querySelector('.menu-lateral')

btnExp.addEventListener('click', function(){
    menuSide.classList.toggle('expandir')
})
/*funções para mostrar o resultado na tela  */
window.onload =  function() {
    const token = localStorage.getItem('token')
    fetch(BASE_URL + '/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json()
        }
        console.error('Erro ao buscar dados:', error);
        alert("Erro ao carregar dados.");
    })
    .then(data => {
        preencherTabela(data)
    });
};

function preencherTabela(Product) {
    const tabela = document.getElementById("tabela-quadras").getElementsByTagName('tbody')[0];

    Product.forEach(item => {
        let linha = tabela.insertRow();
        console.log(item)

        let celulaName = linha.insertCell(0);
        let celulaDescription = linha.insertCell(1);
        let celulaPrice = linha.insertCell(2);
        let celulaUser = linha.insertCell(3);

        celulaName.innerHTML = item.Name;
        celulaDescription.innerHTML = item.Description;
        celulaPrice.innerHTML = item.Price;
        celulaUser.innerHTML = User_id;

    })
}