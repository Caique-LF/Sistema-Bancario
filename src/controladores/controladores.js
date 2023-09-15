const { banco, contas, depositos, saques, transferencias, } = require("../bancodedados")
let { numeroConta } = require("../bancodedados")
const { verificacaoCpf, verificacaoEmail, verificarEmaileCpf,
    verificacaoCampos, verificacaoNumContaEValor, validacaoNumero,
    senhaeValidada, contaEncontradatrue, valorEZero, dataFormatada,
    verificaoContaeSenha } = require('./fucoesvalidacao')


const listagemDeConstas = (req, res) => {
    const senha = req.query.senha_banco

    if (senha !== banco.senha) {
        return res.status(400).json({ mensagem: "A senha do banco informada é inválida!" });
    }
    res.status(200).json(contas);
};

const criarContaBancaria = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (verificacaoCampos(req, res)) { return };
    if (verificarEmaileCpf(req, res)) { return };

    numeroConta++;
    const novoUsuario = {
        numero: numeroConta.toString(),
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }
    contas.push(novoUsuario);
    res.status(201).send();
};

const atualizarUsuário = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { numeroConta } = req.params

    if (verificacaoCampos(req, res)) { return };
    if (validacaoNumero(req, res)) { return };
    if (verificacaoEmail(req, res)) { return };
    if (verificacaoCpf(req, res)) { return };

    let contaEncontrada = contas.find((conta) => {
        return Number(conta.numero) === Number(numeroConta)
    })

    contaEncontrada.usuario = {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    }

    res.status(204).send()
};

const deletarConta = (req, res) => {
    const { numeroConta } = req.params;

    if (validacaoNumero(req, res)) { return };

    let indexConta = contas.findIndex((conta) => {
        return Number(conta.numero) === Number(numeroConta)
    })
    const saldo = contas[indexConta].saldo

    if (saldo !== 0) {
        return res.status(400).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" })
    };

    contas.splice(indexConta, 1);
    res.status(204).send();
};

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body
    const contaEncontrada = contas.find((conta) => { return Number(conta.numero) === Number(numero_conta) })

    if (verificacaoNumContaEValor(req, res)) { return }
    if (valorEZero(req, res, valor)) { return }
    if (contaEncontradatrue(req, res, contaEncontrada)) { return }

    const registroDeposito = {
        "data": dataFormatada(new Date()),
        numero_conta,
        valor
    }
    contaEncontrada.saldo += valor;
    depositos.push(registroDeposito)
    res.status(204).send();
};

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body
    const contaEncontrada = contas.find((conta) => { return Number(conta.numero) === Number(numero_conta) })

    if (verificacaoNumContaEValor(req, res)) { return };
    if (contaEncontradatrue(req, res, contaEncontrada)) { return };
    if (senhaeValidada(req, res, senha, numero_conta)) { return };
    if (contaEncontrada.saldo < valor) {
        return res.status(400).json({ mensagem: "saldo insuficente." })
    };

    const registroSaque = {
        "data": dataFormatada(new Date()),
        numero_conta,
        valor
    };

    contaEncontrada.saldo -= valor;
    saques.push(registroSaque);
    res.status(204).send();

};

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body
    const conta_origem = contas.find((conta) => {
        return Number(conta.numero) === Number(numero_conta_origem);
    })
    const conta_destino = contas.find((conta) => {
        return Number(conta.numero) === Number(numero_conta_destino);
    })

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return res.status(400).json({ mensagem: "numero da conta de origem e numero da conta de destino e valor e senha são Obrigatórios." })
    }
    if (contaEncontradatrue(req, res, conta_origem)) { return };
    if (contaEncontradatrue(req, res, conta_destino)) { return };
    if (senhaeValidada(req, res, senha, numero_conta_origem)) { return };
    if (conta_origem.saldo < valor) {
        return res.status(400).json({ mensagem: "saldo insuficente." })
    };

    const registroTransferencia = {
        "data": dataFormatada(new Date()),
        numero_conta_origem,
        numero_conta_destino,
        valor
    };

    conta_origem.saldo -= valor;
    conta_destino.saldo += valor;
    transferencias.push(registroTransferencia);
    res.status(204).send();
};



const saldo = (req, res) => {
    const { numero_conta, senha } = req.query;
    const conta = contas.find((conta) => {
        return Number(conta.numero) === Number(numero_conta);
    })

    if (verificaoContaeSenha(res, numero_conta, senha)) { return };
    if (contaEncontradatrue(req, res, conta)) { return };
    if (senhaeValidada(req, res, senha, numero_conta)) { return };

    res.status(200).json({ saldo: conta.saldo });
};

const emitirExtrato = (req, res) => {
    const { numero_conta, senha } = req.query;
    const conta = contas.find((conta) => {
        return Number(conta.numero) === Number(numero_conta);
    })

    if (verificaoContaeSenha(res, numero_conta, senha)) { return };
    if (contaEncontradatrue(req, res, conta)) { return };
    if (senhaeValidada(req, res, senha, numero_conta)) { return };

    const retornoDepositos = depositos.filter((deposito) => {
        return Number(deposito.numero_conta) === Number(numero_conta)
    });
    const retornoSaque = saques.filter((saque) => {
        return Number(saque.numero_conta) === Number(numero_conta);
    });
    const retornoTransferenciasRecebidas = transferencias.filter((transferencia) => {
        return Number(transferencia.numero_conta_destino) === Number(numero_conta);
    })
    const retornoTransferenciaseEnviadas = transferencias.filter((transferencia) => {
        return Number(transferencia.numero_conta_origem) === Number(numero_conta);
    });

    const retornoGeral = {
        "depositos": retornoDepositos,
        "saques": retornoSaque,
        "transferenciasEnviadas": retornoTransferenciaseEnviadas,
        "transferenciasRecebidas": retornoTransferenciasRecebidas
    };
    res.status(200).json(retornoGeral);

}

module.exports = {
    listagemDeConstas, criarContaBancaria, atualizarUsuário,
    deletarConta, depositar, sacar, transferir, saldo, emitirExtrato,
};

