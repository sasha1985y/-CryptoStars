//import {sendRequest, sendUserRequest} from './fetch.js';
import {createUserTableRow} from './user-table.js';

/* user profile*/

let testUser;
let contractors = [];

const userProfile = document.querySelector('.user-profile');
const mainToggleContainer = document.querySelector('.main-toggle__container');
const userCryptoBalance = userProfile.querySelector('.user-crypto-balance');
const userFiatBalance = userProfile.querySelector('.user-fiat-balance');

const userProfileName = userProfile.querySelector('.user-profile__name');
const userNickName = userProfileName.querySelector('.nick-name');

const onUserSuccess = (data) => {
  testUser = Object.assign({}, data);
  console.log(testUser);

  let {userName, balances} = testUser;

  userNickName.textContent = userName;

  let [{amount: rubles}, {amount: crypto}] = balances;

  userCryptoBalance.textContent = crypto;
  userFiatBalance.textContent = rubles;

};

/* map, list buttons */

const mapContainer = document.querySelector('.map-container');
const usersList = document.querySelector('.users-list');
const listBtn = mainToggleContainer.querySelector('.list-button');
const mapBtn = mainToggleContainer.querySelector('.map-button');

listBtn.addEventListener('click', () => {
  listBtn.classList.add('is-active');
  mapBtn.classList.remove('is-active');
  mapContainer.style.display = 'none';
  usersList.style.display = 'inline';
});

mapBtn.addEventListener('click', () => {
  mapBtn.classList.add('is-active');
  mapContainer.style.display = 'inline';
  listBtn.classList.remove('is-active');
  usersList.style.display = 'none';
});

/* urers table */

const usersListTableBody = usersList.querySelector('.users-list__table-body');

const onSuccess = (data) => {
  contractors = data.slice();
  contractors.forEach(contractor => {
    contractor = createUserTableRow(contractor);
    usersListTableBody.appendChild(contractor);
  });
  console.log(contractors);
  
};


const buyBtn = mainToggleContainer.querySelector('.buy-button');
const sellBtn = mainToggleContainer.querySelector('.sell-button');

const getSeller = () => {
  const contractorSeller = usersListTableBody.querySelectorAll('.seller');
  return contractorSeller;
};

const getBuyer = () => {
  const contractorBuyer = usersListTableBody.querySelectorAll('.buyer');
  return contractorBuyer;
};

const getVipSeller = () => {
  const vipSeller = usersListTableBody.querySelectorAll('.vip, .seller');
  return vipSeller;
};

const getVipBuyer = () => {
  const vipBuyer = usersListTableBody.querySelectorAll('.vip, .buyer');
  return vipBuyer;
};

const getFreeSeller = () => {
  const freeSeller = usersListTableBody.querySelectorAll('.free, .seller');
  return freeSeller;
};

const getFreeBuyer = () => {
  const freeBuyer = usersListTableBody.querySelectorAll('.free, .buyer');
  return freeBuyer;
};

/* custom checkbox */

const customToggleInput = mainToggleContainer.querySelector('.custom-toggle__input');
const customToggleIcon = mainToggleContainer.querySelector('.custom-toggle__icon');

customToggleInput.addEventListener('change', () => {
  if(sellBtn.classList.contains('is-active')) {
    getVipBuyer().forEach(element => {
      element.style.display = 'flex';
    });
    getFreeBuyer().forEach(element => {
      element.style.display = 'none';
    });
  } else if (buyBtn.classList.contains('is-active')) {
    getVipSeller().forEach(element => {
      element.style.display = 'flex';
    });
    getFreeSeller().forEach(element => {
      element.style.display = 'none';
    });
  }
})

/* buy, sell buttons */

buyBtn.addEventListener('click', () => {
  getBuyer().forEach(element => {
    element.style.display = 'flex';
  });
  buyBtn.classList.add('is-active');
  sellBtn.classList.remove('is-active');
  getSeller().forEach(element => {
    element.style.display = 'none';
  });
});


sellBtn.addEventListener('click', () => {
  getSeller().forEach(element => {
    element.style.display = 'flex';
  });
  sellBtn.classList.add('is-active');
  buyBtn.classList.remove('is-active');
  getBuyer().forEach(element => {
    element.style.display = 'none';
  });
});

/* errors */

const errorBlock = document.getElementById('error-load');

const onError = (error) => {
  errorBlock.style.display = 'inline';
  userProfile.style.display = 'none';
  usersList.style.display = 'none';
  buyBtn.style.display = 'none';
  sellBtn.style.display = 'none';
  mapBtn.style.display = 'none';
  listBtn.style.display = 'none';
  customToggle.style.display = 'none';

};

export {userProfile, onUserSuccess, onSuccess, onError, errorBlock};
