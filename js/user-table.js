const createUserTableRow = (contractor) => {
  const templateUserTableRow = document.querySelector('#user-table-row__template')
  .content
  .querySelector('.users-list__table-row').cloneNode(true);

  const checkedUser = templateUserTableRow.querySelector('.gold-star');
  if(contractor.isVerified) {
    checkedUser.style.display = 'inline';
    templateUserTableRow.classList.add('vip');
  } else if (!contractor.isVerified) {
    templateUserTableRow.classList.add('free');
  }
  
  const contractorName = templateUserTableRow.querySelector('.contractor-name');
  contractorName.textContent = contractor.userName;
  
  const usersListTableCurrency = templateUserTableRow.querySelector('.users-list__table-currency');
  usersListTableCurrency.textContent = contractor.balance.currency;

  const usersListTableExchangerate = templateUserTableRow.querySelector('.users-list__table-exchangerate');
  usersListTableExchangerate.textContent = `${contractor.exchangeRate} ₽`;

  const usersListTableCashlimit = templateUserTableRow.querySelector('.users-list__table-cashlimit');
  if(contractor.status === "buyer") {
    usersListTableCashlimit.textContent = `${contractor.minAmount} ₽ - ${contractor.balance.amount} ₽`;
  } else {
    usersListTableCashlimit.textContent = `${contractor.minAmount} K - ${contractor.balance.amount} K `;
  }

  const usersListBadgesList = templateUserTableRow.querySelector('.users-list__badges-list');
  const badge_1 = templateUserTableRow.querySelector('.first');
  const badge_2 = templateUserTableRow.querySelector('.second');
  const badge_3 = templateUserTableRow.querySelector('.third');

  if(contractor.status === "buyer") {
    usersListBadgesList.style.display = 'none';
    templateUserTableRow.classList.add('seller');
  } else if (contractor.status === "seller") {
    templateUserTableRow.classList.add('buyer');
    let payMethods = Object.assign({}, contractor.paymentMethods);
    let {...rest} = payMethods;

    badge_1.textContent = rest[0].provider;

    delete(rest[0]);

    rest[1] === undefined ? badge_2.style.display = 'none': badge_2.textContent = rest[1].provider;

    delete(rest[1]);

    rest[2] === undefined ? badge_3.style.display = 'none': badge_3.textContent = rest[2].provider;
  
    delete(rest[2]);
  }

  return templateUserTableRow;
}
export {createUserTableRow};