/*
O P.P.L Original já está na forma padrão (somente a Fase II será implementada)

const dados = {
    linhas: 0,
    colunas: 0,
    tabela: null,
}

count = linhas - 1;
*/

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