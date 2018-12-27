const axios = require('axios');

// First Function (GET THE EXCHANGE RATE)
const getRate = async (fromCurrency, toCurrency) => {
  const response = await axios.get('http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1');
  const rate = response.data.rates;
  const euro = 1 / rate[fromCurrency];
  const exchangeRate = euro * rate[toCurrency];

  return exchangeRate;
}

// Second Function (GET COUNTRIES WHERE CURRENCY CAN BE USED)
const getCountries = async (toCurrency) => {
  const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${toCurrency}`);

  return response.data.map(country => (country.name));
}

// Third Function (CONVERTED CURRENCY)
const convertCurrency = async (fromCurrency, toCurrency, amount) => {
  const exchangeRate = await getRate(fromCurrency, toCurrency);
  const countries = await getCountries(toCurrency);
  const convertedAmount = (amount * exchangeRate).toFixed(2);

  return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. \nYou can spend this in the following contries: ${countries}.`;
}

convertCurrency('USD', 'BRL', 30)
  .then((message) => {
    console.log(message);
  })


// getRate('USD', 'BRL')
// getCountries('BRL')