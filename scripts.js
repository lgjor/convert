// Cotação hipotética do dia
const USD = 5.00;
const EUR = 5.50;
const GBP = 7.00;

// Obtendo os elementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

// Manipulando o amount para receber apenas números.
amount.addEventListener(
    'input',
    () => {
        const hasCharactersRegex = /\D+/g;
        amount.value = amount.value.replace(hasCharactersRegex, "");
    }
);

// Captando o evento de submit (enviar) do formulário
form.onsubmit = (event) => {
    event.preventDefault();
 
    switch (currency.value){
        case "USD":
            convertCurrency(amount.value, USD, "US$");
            break;
        case "EUR":
            convertCurrency(amount.value, EUR, "€");
            break;
        case "GBP":
            convertCurrency(amount.value, GBP, "£");
            break;
        default:
            return "Invalid currency";
    }
};

// Função para converter a moeda
function convertCurrency(amount, price, symbol) {
    try {
        // Exibindo a cotação da moeda selecionada
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;
        footer.classList.add("show-result");
        // Calculando o valor total da conversão
        let total = amount * price;
        // Formata o valor para o padrão brasileiro e exibe no id result sem o R$

        // Verifica se o resultado é um número
        if(isNaN(total)){
            return alert("Por favor, digite o valor corretamente para converter.");
        }

        result.textContent = `${formatCurrencyBRL(total).replace("R$", "")}`;
    } catch (error) {
        console.log(error);
        
        // remove a classe do footer removendo ele da tela
        footer.classList.remove("show-result");
        alert("Ocorreu um erro ao converter a moeda. Por favor, tente novamente mais tarde.");
    }
}

// Formata a moeda em Real Brasileiro
function formatCurrencyBRL(value){
    // Converte para número para que seja possível utilizar o toLocaleString para formatar o padrão brasileiro
    return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
    

