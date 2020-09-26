/*
O P.P.L Original já está na forma padrão (somente a Fase II será implementada)

const dados = {
    linhas: 0, //quantidade de restricoes + 1
    colunas: 0, //quantidade de variaveis + 1
    tabela: null, //tablô
    valorZ: null,
    vetorSolucao: null, //tamanho = colunas - linhas
    textoSolucao: ''
}

count = linhas - 1;
*/

// exemplo
const dados = {
    linhas: 4, // 3 restricoes + funcao objetivo
    colunas: 6, // 5 variaveis + coluna b
    tabela: [
        [1, 0, 1, 0, 0, 3],
        [0, 1, 0, 1, 0, 4],
        [1, 2, 0, 0, 1, 9],
        [-5, -2, 0, 0, 0, 0]
    ],
    valorZ: null, //esperado: -21
    vetorSolucao: null, //esperado: [3, 3]
    textoSolucao: ''
}

// Exibe na tela o Problema de progrmação linear inserido
function exibirPPL(){

}

// Preenche o "Tablô" inicial com os dados inseridos
function preencherDados(){

    dados.colunas = Number(document.getElementById('variaveis').value) + 1;
    dados.linhas = Number(document.getElementById('restricoes').value) + 1;

    //criando tabela
    dados.tabela = new Array();

    //preenchendo restricoes
    for (var i = 0; i < dados.linhas - 1; i++){
        const inputsRestricao = document.getElementsByName(`restricao${i}`);
        var vetor = new Array();
        for (var j = 0; j < inputsRestricao.length; j++){
            vetor.push(Number(inputsRestricao[j].value) || 0);
        }
        dados.tabela.push(vetor);
        vetor = null;
    }
    
    //preenchendo última coluna
    const colunaB = document.getElementsByName('colunaB');
    for (var i = 0; i < colunaB.length; i++){
        dados.tabela[i].push(Number(colunaB[i].value) || 0);
    }
    
    
    //preenchendo funcao objetivo

    const funcaoObjetivo = document.getElementsByName('inputFuncaoObj');
    //verificando se MAX ou MIN
    var obj = 0;
    const radios = document.getElementsByName('optradio');
          radios.forEach(r => {
              if(r.checked){
                obj = r.value;
              }
          });

    var array = new Array();
    for (var i = 0; i < funcaoObjetivo.length; i++){
        if(obj == 0){ //maximização
            array.push((Number(funcaoObjetivo[i].value) || 0) * -1);
        }else{ //minimização
            array.push(Number(funcaoObjetivo[i].value) || 0);
        }
        
    }
    array.push(0); //Z
    dados.tabela.push(array);

    exibirTabelaAtual();
    
}

//Calcula a solição ótima do PPL pelo método simplex por meio do Tablô
function calcularSolucao(){
    //preencherDados();
    exibirTabelaAtual();

}

// Primeiro passo do método simplex
function verificarSeSolucaoOtima() {
    // Se for solução ótima, pare
    // Se não, determinar qual variável entra na base
}

// Criação do novo "Tablô" na forma canônica
function pivoteamento(){
    // encontrarColunaPivo()
    // encontarLinhaPivo()

    // Dividir a linha pivô atual pelo valor do pivô atual
    // Zerar os elementos não nulos da coluna pivô que estão acima e abaixo dele 
}

function encontrarColunaPivo(){
    // É a coluna representada pela variável não básica que vai entrar na base
}

function encontrarLinhaPivo(){
    // Linha encontrada através do teste da razão
    // Obs: lembrar de não dividir por valores <= 0; Decrementar count toda vez
    // que se daparar com um caso que não entra pro teste da razão. Se count = 0,
    // para a execução (solução ilimitada)
}

// Exibe na tela a solução encontrada para o P.P.L
function exibirResultado(){
    //renderizar tablô atual
    
}

function exibirTabelaAtual(){

    document.getElementById('section3').classList.remove('d-none');

    const tableHead = document.getElementById('table-head');
    const tableBody = document.getElementById('table-body');

    tableHead.innerHTML = '';
    tableBody.innerHTML = '';

    const th = document.createElement('th');
    th.setAttribute('scope', 'col');
    tableHead.appendChild(document.createTextNode('Base'))

    for (var i = 0; i < dados.tabela[0].length; i++){

        const th = document.createElement('th');
            th.setAttribute('scope', 'col');
            if(i == dados.colunas - 1){
                th.appendChild(document.createTextNode('b'));
            }else{
                th.appendChild(document.createTextNode(`x${i+1}`));
            }

            tableHead.appendChild(th);
    }

    for( var i = 0; i < dados.tabela.length; i++){
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        th.setAttribute('scope', 'row');
        if(i == dados.linhas - 1){
            th.appendChild(document.createTextNode('Funcao'));
        }else{
            th.appendChild(document.createTextNode('?'));
        }
        tr.appendChild(th);

        for (var j = 0; j < dados.tabela[i].length; j++){


            const td = document.createElement('td');
            td.appendChild(document.createTextNode(dados.tabela[i][j]));
            tr.appendChild(td);

            console.log(
                'Linha: ' + i,
                'Coluna:' + j,
                'Valor: ' + dados.tabela[i][j]
            )
        }
        tableBody.appendChild(tr);
    }
}