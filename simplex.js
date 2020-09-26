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

}

//Calcula a solição ótima do PPL pelo método simplex por meio do Tablô
function calcularSolucao(){
    getValues();

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

}