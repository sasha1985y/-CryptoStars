import {createUserTableRow} from './user-table.js';
import {isEscapeKey} from'./map-popup.js';

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
  
  let onlyBuyers = contractors.filter(onlyBuyer => onlyBuyer.status === 'buyer');
  
  let onlySellers = contractors.filter(onlySeller => onlySeller.status === 'seller');

  
  contractors.forEach((contractor) => {
    contractor = createUserTableRow(contractor);
    usersListTableBody.appendChild(contractor);
  });
  
  const buyerBtns = usersListTableBody.querySelectorAll('.buyer-btn')

  for (let i = 0; i < onlyBuyers.length; i++) {
    const onlyBuyer = onlyBuyers[i];
    for (let j = 0; j < buyerBtns.length; j++) {
      const onlyBuyerBtn = buyerBtns[j];
      if(i === j) {
        getBuyerBtn(onlyBuyerBtn, onlyBuyer);
      }
    }
  }
  
  const sellerBtns = usersListTableBody.querySelectorAll('.seller-btn')

  for (let i = 0; i < onlySellers.length; i++) {
    const onlySeller = onlySellers[i];
    for (let j = 0; j < sellerBtns.length; j++) {
      const onlySellerBtn = sellerBtns[j];
      if(i === j) {
        getSellerBtn(onlySellerBtn, onlySeller);
      }
    }
  }
  
};



const popupModalBuy = document.querySelector('.modal--buy');
const popupModalSell = document.querySelector('.modal--sell');

const getBuyerBtn = (onlyBuyerBtn, onlyBuyer) => {
  clickBuyerBtns(onlyBuyerBtn, onlyBuyer);
};

/* click buyer button => window modal sell */

const clickBuyerBtns = (onlyBuyerBtn, onlyBuyer) => {
  onlyBuyerBtn.addEventListener('click', () => {

    popupModalSell.style.display = 'flex';  
    
    if(popupModalSell.style.display === 'flex') {
      const popupModalSellOpened = (popupModalSell.style.display === 'flex');
      popupModalSellStatus(popupModalSellOpened);
    } else if (popupModalSell.style.display === 'none'){
      const popupModalSellClosed = (popupModalSell.style.display === 'none');
      popupModalSellStatus(popupModalSellClosed);
    }

    const buyerStatus = popupModalSell.querySelector('.gold-star');
    (!onlyBuyer.isVerified)? buyerStatus.classList.add('visually-hidden'): buyerStatus.classList.remove('visually-hidden');

    const buyerName = popupModalSell.querySelector('.contractor-name');
    buyerName.textContent = onlyBuyer.userName;

    const buyerInfoData = popupModalSell.querySelector('.exchange-rate');
    buyerInfoData.textContent = `${onlyBuyer.exchangeRate} ₽`;
    
    const buyerCurrencyLimit = popupModalSell.querySelector('.limit');
    buyerCurrencyLimit.textContent = `${onlyBuyer.minAmount} ₽ - ${onlyBuyer.balance.amount} ₽ `;

  })
};

const popupModalSellStatus = (popupModalSellOpened, popupModalSellClosed) => {
  getEscapeCleaner(popupModalSellOpened, popupModalSellClosed);
}

const getSellerBtn = (onlySellerBtn, onlySeller) => {
  clickSellerBtns(onlySellerBtn, onlySeller);
};

/* click seller button => window modal buy */

const clickSellerBtns = (onlySellerBtn, onlySeller) => {
  
  onlySellerBtn.addEventListener('click', () => {
    
    popupModalBuy.style.display = 'flex';

    if(popupModalBuy.style.display === 'flex') {
      const popupModalBuyOpened = (popupModalBuy.style.display === 'flex');
      popupModalBuyStatus(popupModalBuyOpened);
    } else if (popupModalBuy.style.display === 'none'){
      const popupModalBuyClosed = (popupModalBuy.style.display === 'none');
      popupModalBuyStatus(popupModalBuyClosed);
    }
  
    const sellerStatus = popupModalBuy.querySelector('.gold-star');
    (!onlySeller.isVerified)? sellerStatus.classList.add('visually-hidden'): sellerStatus.classList.remove('visually-hidden');

    const sellerName = popupModalBuy.querySelector('.contractor-name');
    sellerName.textContent = onlySeller.userName;
    
    const sellerInfoData = popupModalBuy.querySelector('.exchange-rate');
    sellerInfoData.textContent = `${onlySeller.exchangeRate} ₽`;
    
    const sellerCurrencyLimit = popupModalBuy.querySelector('.limit');
    sellerCurrencyLimit.textContent = `${onlySeller.minAmount} K - ${onlySeller.balance.amount} K `;
    
    const sellerSelectorOptions = popupModalBuy.querySelector('.seller-options');
    const sellerOptions = sellerSelectorOptions.querySelectorAll('.seller-option');
    const sellerOption_1 = popupModalBuy.querySelector('.first-option');
    const sellerOption_2 = popupModalBuy.querySelector('.second-option');
    const sellerOption_3 = popupModalBuy.querySelector('.third-option');
    
    const sellerCardNumber = popupModalBuy.querySelector('.card-number');
    
    const sellerCashMethods = Object.assign({}, onlySeller.paymentMethods);
    const {...rest} = sellerCashMethods;

    

    
    sellerOption_1.textContent = rest[0].provider;
    
    rest[1] === undefined ? sellerOption_2.style.display = 'none': sellerOption_2.textContent = rest[1].provider, rest[1] === undefined ? sellerOption_2.style.display = 'none': sellerOption_2.style.display = 'inline';
    
    rest[2] === undefined ? sellerOption_3.style.display = 'none': sellerOption_3.textContent = rest[2].provider, rest[2] === undefined ? sellerOption_3.style.display = 'none': sellerOption_3.style.display = 'inline';
    
    
    
    
  })
};

const popupModalBuyStatus = (popupModalBuyOpened) => {
  getEscapeCleaner(popupModalBuyOpened);
}

/* Esc cleaner*/

const getEscapeCleaner = (popupModalBuyOpened, popupModalSellOpened) => {
  
  if (popupModalBuyOpened || popupModalSellOpened) {
    document.addEventListener('keydown', (evt) => {
      if(isEscapeKey(evt)) {
        evt.preventDefault();
        popupModalBuy.style.display = 'none';
        popupModalSell.style.display = 'none';
      }
    });
  }  
};

getEscapeCleaner();

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
const customToggle = mainToggleContainer.querySelector('.custom-toggle__input');

customToggleInput.addEventListener('change', () => {
  if(buyBtn.classList.contains('is-active')) {
    getVipBuyer().forEach(element => {
      element.style.display = 'flex';
    });
    getFreeBuyer().forEach(element => {
      element.style.display = 'none';
    });
  } else if (sellBtn.classList.contains('is-active')) {
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
    element.style.display = 'none';
  });
  buyBtn.classList.add('is-active');
  sellBtn.classList.remove('is-active');
  getSeller().forEach(element => {
    element.style.display = 'flex';
  });
});


sellBtn.addEventListener('click', () => {
  getSeller().forEach(element => {
    element.style.display = 'none';
  });
  sellBtn.classList.add('is-active');
  buyBtn.classList.remove('is-active');
  getBuyer().forEach(element => {
    element.style.display = 'flex';
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
