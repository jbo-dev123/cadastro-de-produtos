const formContainer = document.querySelector('.form-container');
const listContainer = document.getElementById('list-container');
const productList = document.getElementById('product-list');
const formProdutos = document.getElementById('form-produtos');
const addProduto = document.getElementById('add-produto');

const products = [];

formProdutos.addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome-produto').value;
    const descricao = document.getElementById('descricao').value;
    const numero = parseFloat(document.getElementById('value').value);
    const disponivel = document.querySelector('input[name="disp"]:checked').value;

    products.push({ nome, descricao, numero, disponivel });

    products.sort((a, b) => a.numero - b.numero); 

    updateProductList();

    formContainer.classList.add('hidden');
    listContainer.classList.remove('hidden'); 

    formProdutos.reset();
});

addProduto.addEventListener('click', () => {
    formContainer.classList.remove('hidden');
    listContainer.classList.add('hidden');
});

function updateProductList() {
    productList.innerHTML = ''; 

    products.forEach((produto, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${produto.nome}</td>
            <td>R$ ${produto.numero.toFixed(2)}</td>
            <td>${produto.disponivel}</td>
        `;

        productList.appendChild(row);
    });
}