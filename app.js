const readline = require('readline-sync');

var trocoDisponivel = [
    {valor: 0.01, quantidade: 0},
    {valor: 0.05, quantidade: 0},
    {valor: 0.10, quantidade: 0},
    {valor: 0.25, quantidade: 0},
    {valor: 0.50, quantidade: 0},
    {valor: 1.00, quantidade: 0},
];

var trocoUtilizado = [
    {valor: 0.01, quantidade: 0},
    {valor: 0.05, quantidade: 0},
    {valor: 0.10, quantidade: 0},
    {valor: 0.25, quantidade: 0},
    {valor: 0.50, quantidade: 0},
    {valor: 1.00, quantidade: 0},
];

var troco = 0;

pegaValorTroco();
quantidadeMoedasDisponiveis();
devolverTroco();
informarTroco();

function pegaValorTroco() {
    troco = readline.question('Qual o valor do troco? ');

    //Transformar valor em inteiro e troca ',' por '.'
    troco = parseFloat(troco.replace(',', '.'));
}

function quantidadeMoedasDisponiveis() {
    trocoDisponivel.map( item => {
        item.quantidade = readline.question('Qual a quantidade disponivel de moedas de R$ ' + item.valor.toFixed(2) + '? ');
        
        //Transformar valor em inteiro
        item.quantidade = parseInt(item.quantidade);
    
    });
}

function devolverTroco() {
    //Subtrair os valores maiores primeiro para devolver a menor quantidade de moedas
    trocoDisponivel.reverse().map( item => {

        //Se a moeda estiver disponível 
        if (item.quantidade > 0) {
            
            //Usa o máximo de moedas que puder
            for (let index = 0; index < item.quantidade; index++) {

                //É possivel utilizar a moeda?
                if ((troco - item.valor) >= 0) {

                    //Remove aquele valor do troco
                    troco = troco - item.valor;

                    //Arredonda o troco para resolver problemas de precisão de float
                    troco = troco.toFixed(2);

                    //Remove uma moeda disponivel
                    item.quantidade = item.quantidade - 1;

                    //Adiciona quantidade no troco utilizado
                    trocoUtilizado.map( moeda => {
                        if (moeda.valor == item.valor) {
                            moeda.quantidade++;
                        }
                    });

                }
            }

        }

    });
}

function informarTroco() {
    //Mostrar a quantiade de moedas
    console.log('\nO seu troco: ');
    console.log(trocoUtilizado);

    //Se faltar troco avisar
    if (troco > 0) {
        console.log('\nFicou faltando R$ ' + troco + ' de troco.')
    }
}