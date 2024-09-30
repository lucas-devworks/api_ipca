const historicoInflacao = require('../data/dados');


// primeira rota (retorno de array)
const retornoDados = () => {
    return historicoInflacao;
}

// segunda rota (retorno por ano)
const retornoAno = (ano) => {
    const anoBuscado = parseInt(ano);
        return historicoInflacao.filter(anoBusca => anoBusca.ano === anoBuscado) //callback
}

// terceira rota (retorno por ID)
const retornoID = (id) => {
    const idIPCA = parseInt(id)
        return historicoInflacao.find(anoBusca => anoBusca.id == idIPCA);
}

// quarta rota (calculo)
const calcularReajuste = (valor, dataInicialMes, dataInicialAno, dataFinalMes, dataFinalAno) => {
    const historicoFiltrado = historicoInflacao.filter(
      historico => {
        if (dataInicialAno === dataFinalAno) {
          return historico.ano === dataInicialAno && historico.mes >= dataInicialMes && historico.mes <= dataFinalMes;
        } else {
          return (
            (historico.ano === dataInicialAno && historico.mes >= dataInicialMes) ||
            (historico.ano > dataInicialAno && historico.ano < dataFinalAno) ||
            (historico.ano === dataFinalAno && historico.mes <= dataFinalMes)
          );
        }
      }
    );
  
    let taxasMensais = 1;
    for (const elemento of historicoFiltrado) {
      taxasMensais *= (elemento.ipca / 100) + 1;
    }
  
    const resultado = valor * taxasMensais;
    return parseFloat(resultado.toFixed(2));
  };

  const validacaoErro = (valor, dataInicialMes, dataInicialAno, dataFinalMes, dataFinalAno) => {
    const anoLimiteFinal = historicoInflacao[historicoInflacao.length - 1].ano;
    const anoLimiteInicial = historicoInflacao[0].ano
    const mesLimiteFinal = historicoInflacao[historicoInflacao.length - 1].mes;
    if (
      isNaN(valor) ||
      isNaN(dataInicialMes) ||
      isNaN(dataInicialAno) ||
      isNaN(dataFinalMes) ||
      isNaN(dataFinalAno) ||
      dataInicialMes < 1 || dataInicialMes > 12 ||
      dataInicialAno < anoLimiteInicial || dataInicialAno > anoLimiteFinal ||
      dataFinalMes < 1 || dataFinalMes > 12 ||
      dataFinalAno < anoLimiteInicial || dataFinalAno > anoLimiteFinal ||
      (dataFinalAno === anoLimiteFinal && dataFinalMes > mesLimiteFinal) ||
      dataFinalAno < dataInicialAno ||
      (dataFinalAno == dataInicialAno && dataFinalMes < dataInicialMes)
    ) {
      return true;
    } else {
      return false;
    }
  };


// exportando funções
module.exports = {retornoDados, retornoAno, retornoID, calcularReajuste, validacaoErro};