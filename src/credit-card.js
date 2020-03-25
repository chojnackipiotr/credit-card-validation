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
const creditCardMonthExpText = document.querySelector('.credit-card__expiration-month');
const creditCardYearExpSelect = document.querySelector('#credit-card-year');
const creditCardYearExpText = document.querySelector('.credit-card__expiration-year');
const creditCardCVVInput = document.querySelector('#credit-card-cvv');
const submitButton = document.querySelector('#credit-card__submit-button');
const eyeIcon = document.querySelector('.card-form__eye-icon');
const creditCardImage = document.querySelector('.credit-card__card-image');

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
  }
  card.setCardData(value, field);
  shouldDisableEyeIcon();
};
// show user actual credit card owner data on html
const showCardOwner = (value) => {
  creditCardOwnerData.innerHTML = value;
};

const cardType = value => {
  let reg = new RegExp('^4');
  if (value.match(reg) != null) return 'visa';

  reg = new RegExp('^(34|37)');
  if (value.match(reg) != null) return 'amex';

  reg = new RegExp('^5[1-5]');
  if (value.match(reg) != null) return 'mastercard';

  reg = new RegExp('^6011');
  if (value.match(reg) != null) return 'discover';

  reg = new RegExp('^62');
  if (value.match(reg) != null) return 'unionpay';

  reg = new RegExp('^9792');
  if (value.match(reg) != null) return 'troy';

  reg = new RegExp('^3(?:0([0-5]|9)|[689]\\d?)\\d{0,11}');
  if (value.match(reg) != null) return 'dinersclub';

  reg = new RegExp('^35(2[89]|[3-8])');
  if (value.match(reg) != null) return 'jcb';

};

const validateCompanyLogo = value => {
  const imageElement = document.createElement('img');
  const company = cardType(value);
  const imageLink = `./static/images/companies-logos/${company}.png`;
  const altName = company;

  imageElement.setAttribute('src', imageLink);
  imageElement.setAttribute('alt', altName);
  imageElement.setAttribute('class', 'credit-card__company-image');
  creditCardImage.innerHTML = '';
  creditCardImage.appendChild(imageElement);
};

const displayCardNumber = value => {
  validateCompanyLogo(value);
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

const showExpData = (value, field) => {
  if (field === 'month') {
    creditCardMonthExpText.innerHTML = value;
  } else if (field === 'year') {
    creditCardYearExpText.innerHTML = value;
  }
};

const setVisibility = () => {
  card.setCardNumberVisibility();
  const cardNumberArray = [...card.cardNumber];

  if (card.isCardNumberVisible) {
    eyeIcon.classList.add('card-form__eye-icon--visible');
    focusShowCardNumber();
    //TODO: after clicking user should see all numbers.
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
creditCardCVVInput.addEventListener('input', (e) => generateData(e.target.value, 'cvv'));
//Eye visibility change
eyeIcon.addEventListener('click', setVisibility);
//Submit form
submitButton.addEventListener('click', () => {
  console.log('CARD DATA', card);
});
