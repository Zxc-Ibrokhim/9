document.addEventListener("DOMContentLoaded", function () {
    const apiKey = 'your_api_key'; // Замените на ваш API ключ
    const amount = document.getElementById('amount');
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const convertButton = document.getElementById('convertButton');
    const result = document.getElementById('result');

    // Заполнение списка валют
    const currencyList = ['USD', 'EUR', 'RUB', 'GBP', 'JPY', 'UZS']; // Добавьте нужные валюты
    currencyList.forEach(currency => {
        let option1 = document.createElement('option');
        option1.value = currency;
        option1.text = currency;
        fromCurrency.appendChild(option1);

        let option2 = document.createElement('option');
        option2.value = currency;
        option2.text = currency;
        toCurrency.appendChild(option2);
    });

    convertButton.addEventListener('click', function () {
        let from = fromCurrency.value;
        let to = toCurrency.value;
        let amountValue = amount.value;

        if (amountValue === "" || isNaN(amountValue)) {
            alert("Введите корректную сумму");
            return;
        }

        fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
            .then(response => response.json())
            .then(data => {
                let rate = data.rates[to];
                let convertedAmount = (amountValue * rate).toFixed(2);
                result.textContent = `${amountValue} ${from} = ${convertedAmount} ${to}`;
            })
            .catch(error => {
                console.error("Ошибка получения данных:", error);
                alert("Не удалось получить данные о валюте. Попробуйте позже.");
            });
    });
});
