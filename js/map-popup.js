const isEscapeKey = (evt) => evt.key === 'Escape';

const createMapPopup = (cashContractor) => {
  const templatMapBaloon = document.querySelector('#map-baloon__template')
  .content
  .querySelector('.user-card').cloneNode(true);

  const checkedStatus = templatMapBaloon.querySelector('.gold-star');
  cashContractor.isVerified? checkedStatus: checkedStatus.classList.add('visually-hidden');

  const cashUserName = templatMapBaloon.querySelector('.contractor-name');
  cashUserName.textContent = cashContractor.userName;
  
  const userBalanceCurrency = templatMapBaloon.querySelector('.balance-currency');
  userBalanceCurrency.textContent = cashContractor.balance.currency;

  const userExchangeRate = templatMapBaloon.querySelector('.exchange-rate');
  userExchangeRate.textContent = `${cashContractor.exchangeRate} ₽`;

  const userCurrencyLimit = templatMapBaloon.querySelector('.limit');
  userCurrencyLimit.textContent = `${cashContractor.minAmount} K - ${cashContractor.balance.amount} K `;

  const card_1 = templatMapBaloon.querySelector('.first-card');
  const card_2 = templatMapBaloon.querySelector('.second-card');
  const card_3 = templatMapBaloon.querySelector('.third-card');

  let payCashMethods = Object.assign({}, cashContractor.paymentMethods);
  let {...rest} = payCashMethods;

  card_1.textContent = rest[0].provider;

  delete(rest[0]);

  rest[1] === undefined ? card_2.style.display = 'none': card_2.textContent = rest[1].provider;

  delete(rest[1]);

  rest[2] === undefined ? card_3.style.display = 'none': card_3.textContent = rest[2].provider;
  
  delete(rest[2]);

  return templatMapBaloon;
}

export {createMapPopup, isEscapeKey};