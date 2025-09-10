const api = 'http://localhost:3000';

const containerLista = document.getElementById('lista-produtos');
const mensagemTeste1 = document.getElementById('mensagem');

async function mostrarMensagem(texto, tempo = 3000) {
    mensagemTeste1.textContent = texto;
    if (tempo > 0) {
        setTimeout(() => {
            if (mensagemTeste1.textContent === texto) mensagemTeste1.textContent = '';
        }, tempo);
    }
}

async function fetchProdutos() {
    try {
        const res = await fetch(`${api}/produtos`);
        if (!res.ok) throw new Error('Erro ao buscar produtos');
        const produtos = await res.json();
        renderProdutos(produtos);
    } catch (err) {
        mostrarMensagem('Erro ao conectar ao servidor: ' + err.message, 5000);
    }
}

function renderProdutos(produtos) {
    if (!produtos || produtos.length === 0) {
        containerLista.innerHTML = '<div class="card">Nenhum produto cadastrado.</div>';
        return;
    }

    const rows = produtos.map(p => {
        const classeBaixa = p.quantidade < 10 ? 'quantity low' : 'quantity';
        return `
          <tr data-id="${p.id}">
            <td><strong>${p.id}</strong></td>
            <td>${p.nome}</td>
            <td class="${classeBaixa}" data-quantidade>${p.quantidade}</td>
            <td class="controls">
              <input type="number" min="1" placeholder="Qtd" value="1" class="q-input" />
              <button class="botao-entrada">Registrar Entrada</button>
              <button class="botao-saida out">Registrar Saída</button>
              <button class="botao-historico">Ver Histórico</button>
            </td>
          </tr>
        `;
    }).join('');

    containerLista.innerHTML = `
        <section class="card">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>      
            <tbody>
                ${rows}
            </tbody>
            </table>
        </section>
      `;

    document.querySelectorAll('tr[data-id]').forEach(tr => {
        const id = tr.dataset.id;
        const botaoEntrada = tr.querySelector('.botao-entrada');
        const botaoSaida = tr.querySelector('.botao-saida');
        const input = tr.querySelector('.q-input');
        const botaoHistorico = tr.querySelector('.botao-historico');

        botaoEntrada.addEventListener('click', async () => {
            const numeroEntrada = Number(input.value) || 0;
            await postEntrada(id, numeroEntrada, tr);
        });

        botaoSaida.addEventListener('click', async () => {
            const numeroSaida = Number(input.value) || 0;
            await postSaida(id, numeroSaida, tr);
        });

        botaoHistorico.addEventListener('click', async () => {
            await verHistorico(id);
        });
    });
}

async function postEntrada(id, quantidade, tr) {
    if (quantidade <= 0) {
        alert('Digite uma quantidade válida (maior que zero).');
        return;
    }
    
    try {
        const res = await fetch(`${api}/produtos/${id}/entrada`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ quantidade })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Erro ao registrar entrada');
        atualizarLinha(tr, data);
        mostrarMensagem(`Entrada registrada: +${quantidade} (${data.nome})`);
    } catch (err) {
        alert('Erro ao conectar ao servidor: ' + err.message);
    }
}

async function postSaida(id, quantidade, tr) {
    if (!quantidade || quantidade <= 0) {
        alert('Digite uma quantidade válida (maior que zero). ');
        return;
    }
    try {
        const res = await fetch(`${api}/produtos/${id}/saida`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ quantidade })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Erro ao registrar saída');
        atualizarLinha(tr, data);
        mostrarMensagem(`Saída registrada: -${quantidade} (${data.nome})`);
    } catch (err) {
        alert('Erro: ' + err.message);
    }
}

function atualizarLinha(tr, produtoAtualizado) {
    const quantidadeElemento = tr.querySelector('[data-quantidade]');
    quantidadeElemento.textContent = produtoAtualizado.quantidade;
    if (produtoAtualizado.quantidade < 10) {
        quantidadeElemento.classList.add('low');
    } else {
        quantidadeElemento.classList.remove('low');
    }
    
}

async function verHistorico(id) {
    try {
        const res = await fetch(`${api}/produtos/${id}/historico`);
        if (!res.ok) throw new Error('Erro ao buscar histórico');
        const hist = await res.json();
        if (!hist || hist.length === 0) {
            alert('Nenhum histórico disponível para este produto.');
            return;
        }
        const linhas = hist.map(h => `${h.data} — ${h.tipo.toUpperCase()} — ${h.quantidade}`).join('\n'); // que porra é essa
        alert(`Histórico do produto ${id}:\n\n${linhas}`);
    } catch (err) {
        alert('Erro: ' + err.message);
    }
}

const formAdicionar = document.getElementById('form-adicionar');
formAdicionar?.addEventListener('submit', async (e) => { 
    e.preventDefault();
    const id = document.getElementById('novo-id').value.trim();
    const nome = document.getElementById('novo-nome').value.trim();
    const quantidade = Number(document.getElementById('novo-quantidade').value || 0);
    if (!id || !nome) {
        alert('Preencha nome e ID');
        return;
    }
    try {
        const res = await fetch(`${api}/produtos`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({id, nome, quantidade})
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Erro ao adicionar produto');
        mostrarMensagem(`Produto ${nome} adicionado com sucesso!`);
        fetchProdutos();
        formAdicionar.reset();
    } catch (err) {
        alert('Erro ao conectar ao servidor: ' + err.message);
    }
});

fetchProdutos();