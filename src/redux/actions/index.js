// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';

export const addEmail = (payload) => ({ type: ADD_EMAIL, payload });

export const addCurrencies = (payload) => ({ type: ADD_CURRENCIES, payload });

export const fetchCurrencies = () => async (dipatch) => {
  const currencyAPI = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(currencyAPI);
  const data = await response.json();
  const filteredResponse = Object.keys(data).filter((element) => element !== 'USDT');
  dipatch(addCurrencies(filteredResponse));
};
