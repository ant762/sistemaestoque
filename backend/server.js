const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let produtos = [
    { id: "001", nome: "Monitor gamer 27 polegadas", quantidade: 25, historico: [] },
    { id: "002", nome: "Teclado mecânico RGB", quantidade: 12, historico: [] },
    { id: "003", nome: "Mouse Óptico 16000 DPI", quantidade: 8, historico: [] },
    { id: "004", nome: "Cadeira gamer", quantidade: 3, historico: [] }
];

function registrarHistorico(produto, tipo, quantidade) {
    produto.historico.push({
        tipo,
        quantidade,
        data: new Date().toISOString()
    });
}

app.get('/produtos', (req, res) => {
    res.json(produtos);
});

// estoque

app.post('/produtos', (req, res) => {
    const {id, nome, quantidade} = req.body;
    if (!id || !nome || quantidade == null) {
        return res.status(400).json({ error: 'ID, nome e quantidade são obrigatórios.' });
    }
    if (produtos.find(p => p.id === id)) {
        return res.status(400).json({ error: 'Produto com este ID já existe.' });
    }

    const novo = {id: String(id), nome, quantidade: Number(quantidade), historico: [] };
    produtos.push(novo);
    res.status(201).json(novo);
});

// estoque

app.post('/produtos/:id/entrada', (req, res) => {
    const {id} = req.params;
    const { quantidade } = req.body;
    const numQuant = Number(quantidade);
    if (isNaN(numQuant) || numQuant <= 0) {
        return res.status(400).json({ error: 'Quantidade deve ser um número positivo.' });
    }
    const produto = produtos.find(p => p.id === id);
    if (!produto) return res.status(404).json({error: 'Produto não encontrado.'});
    
    produto.quantidade += numQuant;
    registrarHistorico(produto, 'entrada', numQuant);
    res.json(produto);
});

app.post('/produtos/:id/saida', (req, res) => {
    const {id} = req.params;
    const { quantidade } = req.body;
    const numQuant = Number(quantidade);
    if (isNaN(q) || q <= 0) {
        return res.status(400).json({ error: 'Quantidade deve ser um número positivo.' });
    }
    const produto = produtos.find(p => p.id === id);
    if (!produto) return res.status(404).json({error: 'Produto não encontrado.'});

    if (produto.quantidade - numQuant < 0) {
        return res.status(400).json({error: 'Estoque insuficiente'});
    }
    produto.quantidade -= numQuant;
    registrarHistorico(produto, 'saida', numQuant);
    res.json(produto);
});

// historico

app.get('/produtos/:id/historico', (req, res) => {
    const { id } = req.params;
    const produto = produtos.find(p => p.id === id);
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado.' });
    res.json(produto.historico || []);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
}); 