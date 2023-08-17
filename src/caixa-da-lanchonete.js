class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    var resultado = "";
    //checa se a array de itens está vazia
    if (itens.length === 0) {
      resultado = "Não há itens no carrinho de compra!";
    } else if (
      metodoDePagamento !== "dinheiro" &&
      metodoDePagamento !== "debito" &&
      metodoDePagamento !== "credito"
    ) {
      resultado = "Forma de pagamento inválida!";
    } else {
      var valorTotalDaCompra = 0;
      var flagInterromper = false;
      var flagCafe = false;
      var flagSanduiche = false;

      //laço itera entre os itens da array itens calculando o valor do pedido
      lacoArrayItens: for (let i = 0; i < itens.length; i++) {
        //divide a string em codigo e quantidade
        var posicaoDaVirgula = itens[i].indexOf(",");
        var codigo = itens[i].slice(0, posicaoDaVirgula);
        var quantidade = itens[i].slice(posicaoDaVirgula + 1);

        //conversão da quantidade de string pra numeral
        var qtd = parseInt(quantidade);

        //checa se a quantidade do item é maior que 0
        if (qtd <= 0) {
          resultado = "Quantidade inválida!";
          flagInterromper = true;
          break lacoArrayItens;
        } else {
          var valorTotalDoItem;

          //multiplica a quantidade do item pelo seu respectivo valor, selecionado de acordo com o codigo
          switch (codigo) {
            case "cafe":
              valorTotalDoItem = qtd * 3;
              flagCafe = true;
              break;

            case "chantily":
              if (flagCafe === true) {
                valorTotalDoItem = qtd * 1.5;
                break;
              } else {
                resultado = "Item extra não pode ser pedido sem o principal";
                flagInterromper = true;
                break lacoArrayItens;
              }

            case "suco":
              valorTotalDoItem = qtd * 6.2;
              break;

            case "sanduiche":
              valorTotalDoItem = qtd * 6.5;
              flagSanduiche = true;
              break;

            case "queijo":
              if (flagSanduiche === true) {
                valorTotalDoItem = qtd * 2;
                break;
              } else {
                resultado = "Item extra não pode ser pedido sem o principal";
                flagInterromper = true;
                break lacoArrayItens;
              }

            case "salgado":
              valorTotalDoItem = qtd * 7.25;
              break;
            case "combo1":
              valorTotalDoItem = qtd * 9.5;
              break;

            case "combo2":
              valorTotalDoItem = qtd * 7.5;
              break;

            default:
              resultado = "Item inválido!";
              flagInterromper = true;
              break lacoArrayItens;
          }
          //adiciona o valor do item ao total da compra
          valorTotalDaCompra = valorTotalDaCompra + valorTotalDoItem;
        }
      }
      if (flagInterromper === false) {
        //soma taxa ou deduz desconto de acordo com a forma de pagamento
        if (metodoDePagamento === "dinheiro") {
          valorTotalDaCompra = valorTotalDaCompra * 0.95;
        } else if (metodoDePagamento === "credito") {
          valorTotalDaCompra = valorTotalDaCompra * 1.03;
        }
        resultado = "R$ " + valorTotalDaCompra.toFixed(2);
        resultado = resultado.replace(".", ",");
      }
    }
    return resultado;
  }
}

export { CaixaDaLanchonete };
