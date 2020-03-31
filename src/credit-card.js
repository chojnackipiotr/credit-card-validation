import visa from './static/images/companies-logos/visa.png';
import amex from './static/images/companies-logos/amex.png';
import mastercard from './static/images/companies-logos/mastercard.png';
import discover from './static/images/companies-logos/discover.png';
import unionpay from './static/images/companies-logos/unionpay.png';
import troy from './static/images/companies-logos/troy.png';
import dinersclub from './static/images/companies-logos/dinersclub.png';
import jcb from './static/images/companies-logos/jcb.png';

class CreditCard {
  constructor() {
    this.cardNumber = '';
    this.cardOwner = '';
    this.expirationMont = '';
    this.expirationYear = '';
    this.cvvCode = '';
    this.isCardNumberVisible = false;
    this.cardCompany = '';
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
const creditCard = document.querySelector('.credit-card');
const creditCardNumberInput = document.querySelector('#credit-card-number');
const creditCardNumbersElements = document.querySelectorAll('.credit-card__single-number');
const creditCardOwnerInput = document.querySelector('#credit-card-owner');
const creditCardOwnerData = document.querySelector('.credit-card__card-owner');
const creditCardMonthExpSelect = document.querySelector('#credit-card-month');
const creditCardMonthExpText = document.querySelector('.credit-card__expiration-month');
const creditCardYearExpSelect = document.querySelector('#credit-card-year');
const creditCardYearExpText = document.querySelector('.credit-card__expiration-year');
const creditCardCVVInput = document.querySelector('#credit-card-cvv');
const submitButton = document.querySelector('#credit-card__submit-button');
const eyeIcon = document.querySelector('.card-form__eye-icon');
const creditCardImage = document.querySelector('.credit-card__card-image');
const creditCardCVVData = document.querySelector('.credit-card__back-cvv-code');

//DOM Manipulation
// generationg comming years
const currentYear = new Date().getFullYear();
let yearsArray = [currentYear];

while (yearsArray.length < 11) {
  let commingYear = currentYear + yearsArray.length;
  yearsArray = [...yearsArray, commingYear];
}

yearsArray.forEach(year => {
  let option = document.createElement('option');
  option.innerHTML = `${year}`;
  option.setAttribute('value', year.toString().substr(-2));
  creditCardYearExpSelect.appendChild(option);
});

//Initialize CC show eye icon as disabled
const shouldDisableEyeIcon = () => {
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
    case 'month':
    case 'year':
      showExpData(value, field);
      break;
    case 'cvv':
      handleCVVData(value);
      break;
  }
  card.setCardData(value, field);
  shouldDisableEyeIcon();
};

const checkIsNumber = (event) => {
  if (event.which < 48 || event.which > 57) {
    event.preventDefault();
  }
};

// show user actual credit card owner data on html
const showCardOwner = (value) => {
  if (value.length === 0) {
    creditCardOwnerData.innerHTML = 'full name';
  } else {
    creditCardOwnerData.innerHTML = value;
  }
};

const cardType = value => {

  let reg = new RegExp('^4');
  if (value.match(reg) != null) return visa;

  reg = new RegExp('^(34|37)');
  if (value.match(reg) != null) return amex;

  reg = new RegExp('^5[1-5]');
  if (value.match(reg) != null) return mastercard;

  reg = new RegExp('^6011');
  if (value.match(reg) != null) return discover;

  reg = new RegExp('^62');
  if (value.match(reg) != null) return unionpay;

  reg = new RegExp('^9792');
  if (value.match(reg) != null) return troy;

  reg = new RegExp('^3(?:0([0-5]|9)|[689]\\d?)\\d{0,11}');
  if (value.match(reg) != null) return dinersclub;

  reg = new RegExp('^35(2[89]|[3-8])');
  if (value.match(reg) != null) return jcb;
};

const rotateCard = (direction) => {
  if (direction === 'front') {
    creditCard.classList.add('credit-card__rotate__front');
    creditCard.classList.remove('credit-card__rotate__back');
  } else {
    creditCard.classList.add('credit-card__rotate__back');
    creditCard.classList.remove('credit-card__rotate__front');
  }
};

const handleCVVData = (value) => {
  creditCardCVVData.innerHTML = value;
};

const validateCompanyLogo = value => {
  const company = cardType(value);
  const altName = cardType(value);
  if (company) {
    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', company);
    imageElement.setAttribute('alt', altName);
    imageElement.setAttribute('class', 'credit-card__company-image');
    creditCardImage.innerHTML = '';
    creditCardImage.appendChild(imageElement);
    card.cardCompany = company;
  } else {
    //TODO: remove company logo
    card.cardCompany = ''
  }
};

const displayCardNumber = value => {
  if (card.cardCompany.length === 0 || card.cardNumber.length === 0) {
    console.log('ok');
    validateCompanyLogo(value);
  }
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
        element.classList.add('credit-card__single-number-animation--active');
        setTimeout(() => {
          element.innerHTML = inputValueArray[index];
        }, 20)
      } else {
        element.classList.remove('credit-card__single-number-animation--active');
        element.innerHTML = '#';
      }
    }
  });
};

const showExpData = (value, field) => {
  if (field === 'month') {
    creditCardMonthExpText.innerHTML = value;
  } else if (field === 'year') {
    creditCardYearExpText.innerHTML = value;
  }
};

const setVisibility = (e) => {
  card.setCardNumberVisibility();
  const cardNumberArray = [...card.cardNumber];
  if (cardNumberArray.length === 0) {
    e.preventDefault();
    return;
  }

  if (card.isCardNumberVisible) {
    eyeIcon.classList.add('card-form__eye-icon--visible');
    focusShowCardNumber();
    creditCardNumbersElements.forEach((element, index) => {
      if (index < cardNumberArray.length) {
        element.innerHTML = cardNumberArray[index];
      } else {
        element.innerHTML = '#';
      }
    });
  } else {
    eyeIcon.classList.remove('card-form__eye-icon--visible');
    blurHideCardNumbers(card.cardNumber);
    creditCardNumbersElements.forEach((element, index) => {
      if (index < 4 && index < cardNumberArray.length || index > 11 && index < cardNumberArray.length) {
        element.innerHTML = cardNumberArray[index];
      } else {
        element.innerHTML = '#';
      }
    });
  }
};

const focusShowCardNumber = () => {
  creditCardNumberInput.value = card.cardNumber;
};

const blurHideCardNumbers = (value) => {
  const inputValueArray = [...value];
  let hiddenNumber = '';

  if (inputValueArray.length > 4) {
    inputValueArray.forEach((element, index) => {
      if (index < 4 || index > 11) {
        hiddenNumber += `${element}`;
      } else {
        hiddenNumber += '*';
      }
    });
  } else {
    hiddenNumber = inputValueArray.join('');
  }

  if (!card.isCardNumberVisible) {
    creditCardNumberInput.value = hiddenNumber;
  }

};

//events
//Set card number on input change
creditCardNumberInput.addEventListener('keypress', (e) => checkIsNumber(e));
creditCardNumberInput.addEventListener('input', (e) => generateData(e.target.value, 'number'));
creditCardNumberInput.addEventListener('blur', (e) => blurHideCardNumbers(e.target.value));
creditCardNumberInput.addEventListener('focus', () => focusShowCardNumber());
//Set owner data
creditCardOwnerInput.addEventListener('input', (e) => generateData(e.target.value, 'owner'));
//Set month expiration date
creditCardMonthExpSelect.addEventListener('change', (e) => generateData(e.target.value, 'month'));
//Set year expiration date
creditCardYearExpSelect.addEventListener('change', (e) => generateData(e.target.value, 'year'));
//Set CVV code
creditCardCVVInput.addEventListener('keypress', (e) => checkIsNumber(e));
creditCardCVVInput.addEventListener('input', (e) => generateData(e.target.value, 'cvv'));
creditCardCVVInput.addEventListener('focus', () => rotateCard('back'));
creditCardCVVInput.addEventListener('blur', () => rotateCard('front'));
//Eye visibility change
eyeIcon.addEventListener('click', (e) => setVisibility(e));
//Submit form
submitButton.addEventListener('click', () => {
  console.log('CARD DATA', card);
});
