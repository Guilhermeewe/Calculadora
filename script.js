document.getElementById('product').addEventListener('change', function() {
    var product = this.value;
    var cotacao = obterCotacaoProduto(product);
    exibirCotacaoProduto(product, cotacao);
    mudarBackground(product);
    
    var investmentAmount = parseFloat(document.getElementById('InvestimentAmount').value);
    var quantity;

    if (product.toLowerCase() === 'arroz' || product.toLowerCase() === 'milho' || product.toLowerCase() === 'feijão' || product.toLowerCase() === 'café') {
        quantity = (investmentAmount / cotacao) * 60; // Multiplica por 60 para produtos de grãos
    } else if (product.toLowerCase() === 'gado' || product.toLowerCase() === 'frango' || product.toLowerCase() === 'porco') {
        quantity = investmentAmount / cotacao;
    } else if (product.toLowerCase() === 'mamão' || product.toLowerCase() === 'banana' || product.toLowerCase() === 'abacaxi' || product.toLowerCase() === 'maracujá' || product.toLowerCase() === 'tomate' || product.toLowerCase() === 'alface' || product.toLowerCase() === 'cenoura' || product.toLowerCase() === 'pimentão' || product.toLowerCase() === 'beterraba') {
        quantity = investmentAmount / cotacao; // Investimento dividido pelo preço da cotação
    } else {
        quantity = (investmentAmount / cotacao); // saca = 60kg
    }

    // Atualizar a quantidade mostrada no formulário
    if (product.toLowerCase() === 'gado' || product.toLowerCase() === 'frango' || product.toLowerCase() === 'porco') {
        document.getElementById('quantity').value = quantity.toFixed(0) + ' Unidades';
    } else {
        document.getElementById('quantity').value = quantity.toFixed(0) + ' Kg';
    }

    // Calcular a quantidade de sacas e mostrar no campo readonly
    let sacks = 0;
    let sacksDiv = document.getElementById('sacksDiv');
    if (product === 'arroz') {
        sacks = Math.floor(quantity / 50);
        sacksDiv.style.display = 'block';
    } else if (product === 'café' || product === 'milho' || product === 'feijão') {
        sacks = Math.floor(quantity / 60);
        sacksDiv.style.display = 'block';
    } else {
        sacksDiv.style.display = 'none';
    }
    document.getElementById('sacks').value = sacks;
});

document.getElementById('InvestimentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Desativar o botão de submit após clicar uma vez
    document.getElementById('submitButton').disabled = true;
   
    var investmentAmount = parseFloat(document.getElementById('InvestimentAmount').value);
    var product = document.getElementById('product').value;
    var cotacao = obterCotacaoProduto(product);
    var quantity;

    if (product.toLowerCase() === 'arroz' || product.toLowerCase() === 'milho' || product.toLowerCase() === 'feijão' || product.toLowerCase() === 'café') {
        quantity = (investmentAmount / cotacao) * 60; // Multiplica por 60 para produtos de grãos
    } else if (product.toLowerCase() === 'gado' || product.toLowerCase() === 'frango' || product.toLowerCase() === 'porco') {
        quantity = investmentAmount / cotacao;
    } else if (product.toLowerCase() === 'mamão' || product.toLowerCase() === 'banana' || product.toLowerCase() === 'abacaxi' || product.toLowerCase() === 'maracujá' || product.toLowerCase() === 'tomate' || product.toLowerCase() === 'alface' || product.toLowerCase() === 'cenoura' || product.toLowerCase() === 'pimentão' || product.toLowerCase() === 'beterraba') {
        quantity = investmentAmount / cotacao; // Investimento dividido pelo preço da cotação
    } else {
        quantity = (investmentAmount / cotacao); // saca = 60kg
    }

    if (product === 'nenhum') {
        var message = 'Você não selecionou nenhum produto para investir.';
        document.getElementById('errorMessage').textContent = message;
        document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('chart').innerHTML = '';
        return;
    }

    // Calcular o investimento total para o produto do agronegócio selecionado
    var totalInvestment = cotacao * quantity;

    // Geração de valores aleatórios para custo e despesas
    var cost = (Math.random() * totalInvestment * 0.5).toFixed(2);
    var expenses = (Math.random() * totalInvestment * 0.3).toFixed(2);
    var profit = (totalInvestment - cost - expenses).toFixed(2);

    // Verificar se o lucro é menor que a soma de custos e despesas
    if (profit < parseFloat(cost) + parseFloat(expenses)) {
        var message = 'Seu lucro é menor que seus gastos e despesas por conta de diversos fatores por exemplo: fatores climáticos, solo degradado e entre outros fatores';
        document.getElementById('errorMessage').textContent = message;
        document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('chart').innerHTML = '';
        return;
    }

    // Criação do gráfico de pizza com base nos resultados
    var data = [{
        values: [parseFloat(cost), parseFloat(expenses), parseFloat(profit)],
        labels: ['Custo', 'Despesas', 'Lucro'],
        type: 'pie',
        marker: {
            colors: ['#ff7f0e', '#ffbb78', '#2ca02c']
        }
    }];

    var layout = {
        title: 'Distribuição de Custo, Despesas e Lucro',
        titlefont: {
            family: 'Arial, sans-serif',
            size: 1,
            color: '#333'
        },
        width: 400,
        height: 400,
        margin: {
            l: 30,
            r: 30,
            b: 30,
            t: 70,
            pad: 4
        },
        showlegend: true,
        legend: {
            x: 1.2,
            y: 0.8,
            bgcolor: 'rgba(255, 255, 255, 0.5)',
            bordercolor: 'rgba(0, 0, 0, 0.2)',
            borderwidth: 2
        },
        paper_bgcolor: 'rgba(255, 255, 255, 0.8)',
        plot_bgcolor: 'rgba(255, 255, 255, 0.8)',
        hoverinfo: 'label+percent+name',
        textinfo: 'value',
        hole: 0.4,
        type: 'pie'
    };

    // Ocultar mensagens de erro se o investimento foi bem-sucedido
    document.getElementById('errorMessage').style.display = 'none';

    Plotly.newPlot('chart', data, layout);

    // Atualizar a quantidade mostrada no formulário
    if (product.toLowerCase() === 'gado' || product.toLowerCase() === 'frango' || product.toLowerCase() === 'porco') {
        document.getElementById('quantity').value = quantity.toFixed(0) + ' Unidades';
    } else {
        document.getElementById('quantity').value = quantity.toFixed(0) + ' Kg';
    }

    // Calcular a quantidade de sacas e mostrar no campo readonly
let sacks = 0;
let sacksDiv = document.getElementById('sacksDiv');
if (product === 'arroz') {
    sacks = Math.ceil(quantity / 50); // Modificado aqui
    sacksDiv.style.display = 'block';
} else if (product === 'café' || product === 'milho' || product === 'feijão') {
    sacks = Math.ceil(quantity / 60); // Modificado aqui
    sacksDiv.style.display = 'block';
} else {
    sacksDiv.style.display = 'none';
}
document.getElementById('sacks').value = sacks;

});

// Função para obter a cotação do produto
function obterCotacaoProduto(product) {
    // Aqui você pode adicionar lógica para obter a cotação do produto selecionado
    // Vou usar valores fictícios para este exemplo
    var cotacoes = {
        café: 1124,
        milho: 59,
        feijão: 173,
        arroz: 111,
        mamão: 10,
        banana: 8,
        abacaxi: 9,
        maracujá: 9,
        tomate: 6,
        alface: 6,
        cenoura: 9,
        pimentão: 6,
        beterraba: 9,
        gado: 227,
        frango: 7,
        porco: 300,
    };

    return cotacoes[product.toLowerCase()] || 'Não disponível';
}

// Função para exibir a cotação do produto
function exibirCotacaoProduto(product, cotacao) {
    var cotacoesList = document.getElementById('cotacoesList');
    cotacoesList.innerHTML = ''; // Limpa o conteúdo anterior

    var unidade = '';
    if (product.toLowerCase() === 'gado' || product.toLowerCase() === 'porco') {
        unidade = 'Arroba = 15kg';
    } else if (product.toLowerCase() === 'arroz') {
        unidade = 'saca = 50kg';
    } else if (product.toLowerCase() === 'mamão' || product.toLowerCase() === 'banana' || product.toLowerCase() === 'abacaxi' || product.toLowerCase() === 'maracujá' || product.toLowerCase() === 'tomate' || product.toLowerCase() === 'alface' || product.toLowerCase() === 'cenoura' || product.toLowerCase() === 'pimentão' || product.toLowerCase() === 'beterraba') {
        unidade = '1 kg';
    } else if (product.toLowerCase() === 'frango') {
        unidade = 'Unidades';
    } else {
        unidade = 'saca = 60kg';
    }

    var today = new Date();
    var formattedDate = '28/05/2024'; // Data fixa, ajustar conforme necessário

    var mensagem = '<br>Data do valor do produto: ' + formattedDate;

    var item = document.createElement('div');
    item.innerHTML = `<strong>${product.charAt(0).toUpperCase() + product.slice(1)} (${unidade}):</strong> R$ ${cotacao}. ${mensagem}`;
    cotacoesList.appendChild(item);
}

document.addEventListener('DOMContentLoaded', function() {
    // Define a imagem de fundo padrão no carregamento da página
    mudarBackground('default');
});

function mudarBackground(product) {
    var backgroundDiv = document.getElementById('background');
    var imagens = {
        'café': './img/cafe.png',
        'milho': './img/milho.png',
        'feijão': './img/feijao.png',
        'arroz': './img/arroz.png',
        'mamão': './img/mamao.png',
        'banana': './img/banana.png',
        'abacaxi': './img/abacaxi.png',
        'maracujá': './img/maracuja.png',
        'tomate': './img/tomate.png',
        'alface': './img/alface.png',
        'cenoura': './img/cenoura.png',
        'pimentão': './img/pimentao.png',
        'beterraba': './img/beterraba.png',
        'gado': './img/gado.png',
        'frango': './img/frango.png',
        'porco': './img/porco.png',
        'default': './img/image.png' // Background padrão
    };

    var imagem = imagens[product.toLowerCase()] || imagens['default'];
    backgroundDiv.style.backgroundImage = `url('${imagem}')`;
}
