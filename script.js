const formContainer = document.querySelector('.form-container');
const listContainer = document.getElementById('list-container');
const productList = document.getElementById('product-list');
const formProdutos = document.getElementById('form-produtos');
const addProduto = document.getElementById('add-produto');

let products = JSON.parse(localStorage.getItem('products')) || [];
let editIndex = -1; 

function saveToStorage() {
  localStorage.setItem('products', JSON.stringify(products));
}

function updateProductList() {
  productList.innerHTML = '';

  products.forEach((produto, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${produto.nome}</td>
      <td>R$ ${produto.numero.toFixed(2)}</td>
      <td>${produto.disponivel}</td>
      <td>
        <button class="edit-btn" data-index="${index}">Editar</button>
        <button class="delete-btn" data-index="${index}">Excluir</button>
      </td>
    `;

    productList.appendChild(row);
  });

  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      editIndex = e.target.dataset.index;
      const produto = products[editIndex];

      document.getElementById('nome-produto').value = produto.nome;
      document.getElementById('descricao').value = produto.descricao;
      document.getElementById('value').value = produto.numero;
      document.querySelector(`input[name="disp"][value="${produto.disponivel}"]`).checked = true;

      formContainer.classList.remove('hidden');
      listContainer.classList.add('hidden');
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      products.splice(index, 1);
      saveToStorage();
      updateProductList();
    });
  });
}

formProdutos.addEventListener('submit', function (event) {
  event.preventDefault();

  const nome = document.getElementById('nome-produto').value;
  const descricao = document.getElementById('descricao').value;
  const numero = parseFloat(document.getElementById('value').value);
  const disponivel = document.querySelector('input[name="disp"]:checked').value;

  if (editIndex >= 0) {
    products[editIndex] = { nome, descricao, numero, disponivel };
    editIndex = -1;
  } else {
    products.push({ nome, descricao, numero, disponivel });
  }
  products.sort((a, b) => a.numero - b.numero);

  saveToStorage();
  updateProductList();

  formContainer.classList.add('hidden');
  listContainer.classList.remove('hidden');

  formProdutos.reset();
});

addProduto.addEventListener('click', () => {
  editIndex = -1; 
  formProdutos.reset();
  formContainer.classList.remove('hidden');
  listContainer.classList.add('hidden');
});

updateProductList();