const formContainer = document.getElementById('form-container')
const listContainer = document.getElementById('list-container')
const productList =  document.getElementById('product-list')
const formProdutos = document.getElementById('form-produtos')
const addProduto = document.getElementById('add-produto')

const products = [];

formProdutos.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome-produto').value;
    const descricao = document.getElementById('descricao').value;
    const numero = parseFloat(document.getElementById('value').value);
    const disponivel = document.querySelector('input[name = "disp"]:checked').value;

    products.push({nome, descricao, numero, disponivel})
    
})