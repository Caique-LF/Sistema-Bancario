const { format } = require('date-fns');
const { numeroConta, banco, contas, saques, depositos, transferencias } = require('../bancodedados');

const verificacaoCpf = (req, res) => {
    const { cpf } = req.body
    const verificarCpf = contas.some((pessoa) => {
        return pessoa.usuario.cpf === cpf;
    })

    if (verificarCpf) {
        return res.status(400).json({ mensagem: "O CPF informado já existe cadastrado!" })
    }
};

const verificacaoEmail = (req, res,) => {
    const { email } = req.body
    const verificarEmail = contas.some((pessoa) => {
        return pessoa.usuario.email === email;
    });
    if (verificarEmail) {
        return res.status(400).json({ mensagem: "O EMAIL informado já existe cadastrado" })
    }
};

const verificarEmaileCpf = (req, res) => {
    const { cpf } = req.body
    const { email } = req.body

    const verificarCpf = contas.some((pessoa) => {
        return pessoa.usuario.cpf === cpf;
    });
    const verificarEmail = contas.some((pessoa) => {
        return pessoa.usuario.email === email;
    });

    if (verificarCpf || verificarEmail) {
        return res.status(400).json({ mensagem: "Já existe uma conta com o cpf ou e-mail informado!" })
    }
};

const verificacaoCampos = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: "Os campos nome, cpf, data_nascimento, telefone, email e senha são obrigatorios e devem estar prenchidos." })
    };
}

const validacaoNumero = (req, res) => {
    const { numeroConta } = req.params
    let validar = contas.some((conta) => {
        return Number(conta.numero) === Number(numeroConta);
    })
    if (!validar) {
        return res.status(400).json({ mensagem: "Não há conta registrada com esse número." })
    };
};

const dataFormatada = (data) => {
    const dataeHoraFormat = format(data, "yyyy-MM-dd HH:mm:ss")
    return dataeHoraFormat;
};

const verificacaoNumContaEValor = (req, res) => {
    const { numero_conta, valor } = req.body
    if (!numero_conta || valor !== 0 && !valor) {
        return res.status(400).json({ mensagem: "O número da conta e o valor são obrigatórios!" })
    };
};

const valorEZero = (req, res, valor) => {
    if (valor <= 0) {
        return res.status(400).json({ mensagem: "O valor de deposito não pode ser menor que 0 ou 0" })
    };
}

const contaEncontradatrue = (req, res, conta) => {
    if (!conta) {
        return res.status(400).json({ mensagem: "Não há conta registrada com esse identificador." })
    };
};

const senhaeValidada = (req, res, senha, numero_conta) => {
    const contaEncontrada = contas.find((conta) => { return Number(conta.numero) === Number(numero_conta) })
    const senhaConta = contaEncontrada.usuario.senha;

    if (senhaConta !== senha) {
        return res.status(400).json({ mensagem: "Senha invalida!" })
    };

};

const verificaoContaeSenha = (res, numero_conta, senha) => {
    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: "Numero da conta e senha são obrigatórios." })
    };
};

module.exports = {
    verificacaoCpf, verificacaoEmail, verificarEmaileCpf,
    verificacaoCampos, verificacaoNumContaEValor, validacaoNumero,
    senhaeValidada, contaEncontradatrue, valorEZero, dataFormatada,
    verificaoContaeSenha
}