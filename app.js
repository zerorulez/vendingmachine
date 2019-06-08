const readline = require('readline-sync');

var troco = {
    valor: 0,
    moedas: [
        {valor: 0.01, disponivel: 0, utilizado: 0},
        {valor: 0.05, disponivel: 0, utilizado: 0},
        {valor: 0.10, disponivel: 0, utilizado: 0},
        {valor: 0.25, disponivel: 0, utilizado: 0},
        {valor: 0.50, disponivel: 0, utilizado: 0},
        {valor: 1.00, disponivel: 0, utilizado: 0}
    ]
};

pegaValorTroco();
quantidadeMoedasDisponiveis();
devolverTroco();
informarTroco();

function pegaValorTroco() {
    troco.valor = readline.question('Qual o valor do troco? ');

    //Transformar valor em inteiro e troca ',' por '.'
    troco.valor = parseFloat(troco.valor.replace(',', '.'));
}

function quantidadeMoedasDisponiveis() {
    troco.moedas.map( item => {
        item.disponivel = readline.question('Qual a quantidade disponivel de moedas de R$ ' + item.valor.toFixed(2) + '? ');
        
        //Transformar valor em inteiro
        item.disponivel = parseInt(item.disponivel);
    
    });
}

function devolverTroco() {
    //Subtrair os valores maiores primeiro para devolver a menor quantidade de moedas
    troco.moedas.reverse().map( item => {

        //Se a moeda estiver disponível 
        if (item.disponivel > 0) {
            
            //Usa o máximo de moedas que puder
            for (let index = 0; index < (item.disponivel + item.utilizado); index++) {

                //É possivel utilizar a moeda?
                if ((troco.valor - item.valor) >= 0) {

                    //Remove aquele valor do troco
                    troco.valor = troco.valor - item.valor;

                    //Arredonda o troco para resolver problemas de precisão de float
                    troco.valor = troco.valor.toFixed(2);

                    //Adiciona uma moeda utilizada
                    item.utilizado++;
                    item.disponivel -= 1;

                }
            }

        }

    });
}

function informarTroco() {
    //Mostrar a quantiade de moedas
    console.log('\nO seu troco: ');
    console.log(troco.moedas.reverse());

    //Se faltar troco avisar
    if (troco.valor > 0) {
        console.log('\nFicou faltando R$ ' + troco.valor + ' de troco.')
    }
}