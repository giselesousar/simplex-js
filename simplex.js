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

*/

// exemplo
const dados = {
    linhas: 4,  // 3 restricoes + funcao objetivo
    colunas: 6, // 5 variaveis + coluna b
    tabela: [
        [1.0, 0.0, 1.0, 0.0, 0.0, 3.0],
        [0.0, 1.0, 0.0, 1.0, 0.0, 4.0],
        [1.0, 2.0, 0.0, 0.0, 1.0, 9.0],
        [-5.0, -2.0, 0.0, 0.0, 0.0, 0.0]
    ],
    valorZ: null, //esperado: -21
    vetorSolucao: null, //esperado: [3, 3]
    textoSolucao: ''
};

var colunaDoPivo, linhaDoPivo;

calcularSolucao();

/*
Objetivo: Exibir na tela o Problema de progrmação linear inserido
Retorno: null
*/ 
function exibirPPL(){

}

/*
Objetivo: Preencher o "Tablô" inicial com os dados inseridos
Retorno: null
*/ 
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

/*
Objetivo: Calcular a solição ótima do PPL pelo método simplex por meio do Tablô
Retorno: null
*/
function calcularSolucao(){
    //getValues();
    //preencherDados();
    exibirTabelaAtual();
    
    while(!verificarSeSolucaoOtima()){

        if(!realizaPivoteamento()){
            break;
        }
        
    }

    if(verificarSeSolucaoOtima()){
        dados.textoSolucao = 'Solução ótima encontarada!';
        dados.vetorSolucao = [3,3];
        dados.valorZ = dados.tabela[dados.linhas-1][dados.colunas-1]*(-1);
        exibirResultado();
    
    } else {
        dados.textoSolucao = 'Solução não limitada!';
        exibirResultado();
    }
}

/*
Objetivo: Percorrer o vetor que representa a função objetivo em busca de
pelo menos um coeficiente negativo. Caso encontre, a solução ainda não
é a solução ótima e então informa qual a coluna do novo pivô. Caso contrário, 
a solução atual é ótima.
Retorno: Boolean. Se for solução ótima, retorna true e o processo deve parar; 
Caso contário, retorna false e a variável que entra na base será identificada 
pela variável 'colunaDoPivo'.
*/
function verificarSeSolucaoOtima() {
    min = 0;
    colunaDoMin = -1;

    for (i = 0; i < dados.colunas - 1; i++){
        coefFuncObj = dados.tabela[dados.linhas - 1][i];

        if(coefFuncObj < min){
            min = coefFuncObj;
            colunaDoMin = i;
        }
        
        //console.log(min);
    }
    //console.log(colunaDoMin);
    if(colunaDoMin === -1) return true;
    
    colunaDoPivo = colunaDoMin;
    return false; 

}

/*
Objetivo: Identificar se será realizado o processo de pivoteamento atravás
da consulta à função existeLinhaPivo. Caso seja possível realizar o pivoteamento,
essa função gerará o novo tablô na forma canônica e o processo de busca pela solução
ótima deve se reiniciar
Retorno: Boolean. Se true, o pivotamento foi realizado com sucesso. Caso contrário,
a solução é ilimitada.
*/
function realizaPivoteamento(){

    if(!existeLinhaPivo())
    {
        return false

    } else {
        
        // Dividindo a linha do pivô atual pelo valor do pivô atual
        elementoDivisao = dados.tabela[linhaDoPivo][colunaDoPivo];
        for(j = 0; j <= dados.colunas - 1; j++){
            dados.tabela[linhaDoPivo][j] = (dados.tabela[linhaDoPivo][j]/elementoDivisao);

        }

        // Zerando os elementos não nulos da coluna do pivô que estão acima e abaixo dele
        for(i = 0; i <= dados.linhas - 1; i++){                            

            if(i != linhaDoPivo && dados.tabela[i][colunaDoPivo] != 0){     //-> Verificando condição de operação

                elementoMultiplicacao = dados.tabela[i][colunaDoPivo]*(-1);
                for(j = 0; j <= dados.colunas -1; j++){              
                    dados.tabela[i][j] = (dados.tabela[linhaDoPivo][j]*elementoMultiplicacao) + dados.tabela[i][j];
                }
            }
        }

        return true;
    }  
}

/*
Objetivo: Realizar o teste da razão para descobrir a linha do novo pivô. Caso exista,
atualizar a variável linhaDoPivo. Caso contrário, informar que a solução é ilimitada.
Retorno: Boolean. Se false, significa que a solução é ilimitada e que o processo de
busca pela solução ótima deve parar. Caso contrário, atualiza a variável linhaDoPivo
e deve se iniciar o processo de pivoteamento. 
*/
function existeLinhaPivo(){
    min = Math.min(); 
    // Quando nenhum parâmetro é passado a função Math.min() retorna 'infinito'
    linhaDoMin = -1;

    for(i = 0; i < dados.linhas - 1; i++){
        coeficiente = dados.tabela[i][colunaDoPivo];

        if(coeficiente > 0){
            b = dados.tabela[i][dados.colunas - 1];

            if(Math.min(min, (b/coeficiente)) < min){
                min = (b/coeficiente);
                linhaDoMin = i;
            }
        }
        
    }

    if(linhaDoMin === -1) return false;

    linhaDoPivo = linhaDoMin;
    return true;
}

/*
Objetivo: Exibir na tela a solução encontrada para o P.P.L
Retorno: null
*/ 
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