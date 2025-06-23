import produtos from "./dbProducts.js";

const containerCarrinho = document.getElementById("cart-container");
const containerProdutos = document.getElementById("products-container");
const containerCartoesCursos = document.getElementById("dessert-card-container");

const botaoCarrinho = document.getElementById("cart-btn");
const botaoLimparCarrinho = document.getElementById("clear-cart-btn");

const totalItens = document.getElementById("total-items");
const subtotal = document.getElementById("subtotal");
const impostos = document.getElementById("taxes");
const totalGeral = document.getElementById("total");

const spanMostrarOcultarCarrinho = document.getElementById("show-hide-cart");

let carrinhoVisivel = false;

// Gerar cards de cursos
produtos.forEach(({ id, nome, preco, categoria }) => {
  containerCartoesCursos.innerHTML += `
    <div class="dessert-card course-card">
        <img src="curso1.jpg" alt="Curso 1">
        <h2>${nome}</h2>
        <p class="dessert-price">R$ ${preco}</p>
        <p class="product-category">Categoria: ${categoria}</p>
        <button id="${id}" class="btn add-to-cart-btn">Adicionar ao Carrinho</button>
    </div>
  `;
});

class CarrinhoDeCompras {
  constructor() {
    this.itens = [];
    this.total = 0;
    this.taxa = 8.25;
  }

  adicionarItem(id, listaProdutos) {
    const produto = listaProdutos.find((item) => item.id === id);
    const { nome, preco } = produto;
    this.itens.push(produto);

    const contagemPorProduto = {};
    this.itens.forEach((curso) => {
      contagemPorProduto[curso.id] = (contagemPorProduto[curso.id] || 0) + 1;
    });

    const quantidadeAtual = contagemPorProduto[produto.id];
    const spanQuantidadeProduto = document.getElementById(`product-count-for-id${produto.id}`);

    quantidadeAtual > 1
      ? spanQuantidadeProduto.textContent = `${quantidadeAtual}x`
      : containerProdutos.innerHTML += `
          <div id="dessert${id}" class="product">
              <p>
              <span class="product-count" id="product-count-for-id${id}">
                  ${nome}
              </span>
              </p>
              <p>R$ ${preco}</p>   
          </div>
        `;
  }

  calcularTotal() {
    const subtotalValor = this.itens.reduce((total, item) => total + item.preco, 0);
    const valorImposto = this.calcularImpostos(subtotalValor);
    this.total = subtotalValor + valorImposto;

    subtotal.textContent = `R$ ${subtotalValor.toFixed(2)}`;
    impostos.textContent = `R$ ${valorImposto.toFixed(2)}`;
    totalGeral.textContent = `R$ ${this.total.toFixed(2)}`;

    return this.total;
  }

  obterQuantidadeItens() {
    return this.itens.length;
  }

  calcularImpostos(valor) {
    return parseFloat(((this.taxa / 100) * valor).toFixed(2));
  }

  limparCarrinho() {
    if (!this.itens.length) {
      alert("Seu carrinho já está vazio");
      return;
    }
    const confirmacao = confirm("Tem certeza que deseja limpar o carrinho?");
    if (confirmacao) {
      this.itens = [];
      this.total = 0;
      containerProdutos.innerHTML = "";
      subtotal.textContent = "0";
      impostos.textContent = "0";
      totalGeral.textContent = "0";
      totalItens.textContent = "0";
    }
  }
}

// Instanciar e configurar eventos
const carrinho = new CarrinhoDeCompras();
const botoesAdicionar = document.getElementsByClassName("add-to-cart-btn");

[...botoesAdicionar].forEach((botao) => {
  botao.addEventListener("click", (event) => {
    carrinho.adicionarItem(Number(event.target.id), produtos);
    totalItens.textContent = carrinho.obterQuantidadeItens();
    carrinho.calcularTotal();
  });
});

botaoCarrinho.addEventListener("click", () => {
  carrinhoVisivel = !carrinhoVisivel;
  spanMostrarOcultarCarrinho.textContent = carrinhoVisivel ? "Ocultar" : "Mostrar";
  containerCarrinho.style.display = carrinhoVisivel ? "block" : "none";
});

botaoLimparCarrinho.addEventListener("click", carrinho.limparCarrinho.bind(carrinho));
