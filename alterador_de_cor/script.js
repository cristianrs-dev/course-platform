const coresEscuras = [
  "#2C3E50",
  "#34495E",
  "#2C2C2C",
  "#616A6B",
  "#4A235A",
  "#2F4F4F",
  "#0E4B5A",
  "#36454F",
  "#2C3E50",
  "#800020",
];

/*A função Math.floor() arredonda um número para baixo, 
ou seja, para o inteiro mais próximo menor ou igual ao número.*/
function obterIndiceAleatorio() {
  const indiceAleatorio = Math.floor(coresEscuras.length * Math.random());
  console.log(indiceAleatorio);
  return indiceAleatorio;
}

const corpo = document.querySelector("body"); 
const elementoHexCor = document.querySelector("#bg-hex-code");

//muda a cor do body
function mudarCorDeFundo() {
  const cor = coresEscuras[obterIndiceAleatorio()];

  elementoHexCor.innerText = cor;
  corpo.style.backgroundColor = cor;
}

const botao = document.querySelector("#btn");
console.log(botao);


botao.onclick = mudarCorDeFundo;

console.log(elementoHexCor);

obterIndiceAleatorio(); 
