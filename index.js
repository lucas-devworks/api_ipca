const express = require('express');
const { retornoDados, retornoAno, retornoID, calcularReajuste, validacaoErro } = require('./servico/servico'); // importando funções


const app = express();

// quarta rota ()
app.get('/historicoIPCA/calculo', (req, res) => {
    const valor = parseFloat(req.query.valor);
    const dataInicialMes = parseInt(req.query.mesInicial);
    const dataInicialAno = parseInt(req.query.anoInicial);
    const dataFinalMes = parseInt(req.query.mesFinal);
    const dataFinalAno = parseInt(req.query.anoFinal);
  
    if (validacaoErro(valor, dataInicialMes, dataInicialAno, dataFinalMes, dataFinalAno)) {
      res.status(400).json({ erro: 'Parâmetros inválidos' });
      return;
    }
  
    const resultado = calcularReajuste(valor, dataInicialMes, dataInicialAno, dataFinalMes, dataFinalAno);
    res.json({ resultado: resultado });
  });


// primeira e segunda rota (retorno de array, retorno por ano)
app.get('/historicoIPCA', (req, res) => {
    const ano = req.query.valorAno;
    const resposta = ano ? retornoAno(ano) : retornoDados();
        
        if (resposta.length > 0) { // tratando ano inválido
            res.json(resposta)
        } else {
            res.status(404).send({'erro': 'Nenhum histórico encontradao para o ano especificado'})
        }
});


// teceira rota (retorno por ID)
app.get('/historicoIPCA/:idIPCA', (req, res) => {
    const id = retornoID(req.params.idIPCA);

    if (id) {
        res.json(id)
    } else if (isNaN(parseInt(req.params.idIPCA))) {
        res.status(400).send({'erro': 'Requisição inválidada'});
    } else {
        res.status(404).send({'erro': 'ID não encontrado'})
    }

});




app.listen('8080', () => {
    console.log('Servidor iniciado na porta 8080')
})