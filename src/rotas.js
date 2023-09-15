const express = require('express');
const { listagemDeConstas, criarContaBancaria, atualizarUsuário,
    deletarConta, depositar, sacar, transferir, saldo, emitirExtrato } = require('./controladores/controladores');

const rotas = express();

rotas.get('/contas', listagemDeConstas);
rotas.post('/contas', criarContaBancaria);
rotas.put('/contas/:numeroConta/usuario', atualizarUsuário);
rotas.delete('/contas/:numeroConta', deletarConta);
rotas.post('/transacoes/depositar', depositar);
rotas.post('/transacoes/sacar', sacar);
rotas.post('/transacoes/transferir', transferir);
rotas.get('/contas/saldo', saldo);
rotas.get('/contas/extrato', emitirExtrato);

module.exports = rotas;