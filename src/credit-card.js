class CreditCard {
  constructor() {
    this.cardNumber = '';
    this.cardOwner = '';
    this.expirationMont = '';
    this.expirationYear = '';
    this.cvvCode = '';
    this.isCardNumberVisible = false;
  }

  setCardData(value, field) {
    switch (field) {
      case 'number':
        return this.cardNumber = value;
      case 'owner':
        return this.cardOwner = value;
      case 'month':
        return this.expirationMont = value;
      case 'year':
        return this.expirationYear = value;
      case 'cvv':
        return this.cvvCode = value;
    }
  }

  setCardNumberVisibility() {
    return this.isCardNumberVisible = !this.isCardNumberVisible;
  }

}

//CreditCard initialization
const card = new CreditCard();

// variables
const creditCardNumberInput = document.querySelector('#credit-card-number');
const creditCardNumbersElements = document.querySelectorAll('.credit-card__single-number');
const creditCardOwnerInput = document.querySelector('#credit-card-owner');
const creditCardOwnerData = document.querySelector('.credit-card__card-owner');
const creditCardMonthExpSelect = document.querySelector('#credit-card-month');
const creditCardYearExpSelect = document.querySelector('#credit-card-year');
const creditCardCVVInput = document.querySelector('#credit-card-cvv');
const submitButton = document.querySelector('#credit-card__submit-button');
const eyeIcon = document.querySelector('.card-form__eye-icon');

//Initialize CC show eyeicon as disabled
const shouldDisableEyeIcon = () => {
  console.log('card.cardNumber', card.cardNumber);
  return card.cardNumber.length === 0 ? eyeIcon.classList.add('card-form__eye-icon--disabled') : eyeIcon.classList.remove('card-form__eye-icon--disabled');
};
shouldDisableEyeIcon();

//functions
const generateData = (value, field) => {
  switch (field) {
    case 'number':
      displayCardNumber(value);
      break;
    case 'owner':
      showCardOwner(value);
      break;
  }
  card.setCardData(value, field);
  shouldDisableEyeIcon();
};
// show user actual credit card owner data on html
const showCardOwner = (value) => {
  creditCardOwnerData.innerHTML = value;
};

const displayCardNumber = value => {
  const inputValueArray = [...value];
  creditCardNumbersElements.forEach((element, index) => {
    if (card.isCardNumberVisible) {
      if (index < inputValueArray.length) {
        element.innerHTML = inputValueArray[index];
      } else {
        element.innerHTML = '#';
      }
    } else {
      if (index < 4 && index < inputValueArray.length || index > 11 && index < inputValueArray.length) {
        element.innerHTML = inputValueArray[index];
      } else {
        element.innerHTML = '#';
      }
    }
  });
};

const setVisibility = () => {
  card.setCardNumberVisibility();
  if (card.isCardNumberVisible) {
    eyeIcon.classList.add('card-form__eye-icon--visible');
    //TODO: after clicking user should see all numbers.
  } else {
    eyeIcon.classList.remove('card-form__eye-icon--visible');
  }
};

//events
//Set card number on input change
creditCardNumberInput.addEventListener('input', (e) => generateData(e.target.value, 'number'));
//Set owner data
creditCardOwnerInput.addEventListener('input', (e) => generateData(e.target.value, 'owner'));
//Set month expiration date
creditCardMonthExpSelect.addEventListener('change', (e) => generateData(e.target.value, 'month'));
//Set year expiration date
creditCardYearExpSelect.addEventListener('change', (e) => generateData(e.target.value, 'year'));
//Set CVV code
creditCardCVVInput.addEventListener('input', (e) => generateData(e.target.value, 'cvv'));
//Eye visibility change
eyeIcon.addEventListener('click', setVisibility);
//Submit form
submitButton.addEventListener('click', () => {
  console.log('CARD DATA', card);
});
