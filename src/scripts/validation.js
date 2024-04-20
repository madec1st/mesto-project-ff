const validationSettings = {
  formClass: '.popup__form',
  inputClass: '.popup__input',
  submitButtonClass: '.popup__button',
  inactiveButtonClass: 'popup__button-inactive',
  inputErrorClass: 'popup__input-invalid',
  errorSpanClass: 'popup__input-error',
  errorClass: 'popup__input-error_active'
}

function disableButton(form, validationSettings) {
  const popupButton = form.querySelector(validationSettings.submitButtonClass);
  popupButton.classList.add(validationSettings.inactiveButtonClass);
  popupButton.setAttribute('disabled', 'disabled');
}

function enableButton(form, validationSettings) {
  const popupButton = form.querySelector(validationSettings.submitButtonClass);
  popupButton.classList.remove(validationSettings.inactiveButtonClass);
  popupButton.removeAttribute('disabled');
}

function checkFormValidity(form, validationSettings) {
  const inputList = Array.from(form.querySelectorAll(validationSettings.inputClass));
  const validForm = inputList.every(input => input.validity.valid);

  if (validForm) {
    enableButton(form, validationSettings)
  } else {
    disableButton(form, validationSettings)
  }
}

function showInputError(form, input, errorMessage, validationSettings) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorClass);
  input.classList.add(validationSettings.inputErrorClass);
}

function hideInputError(form, input, validationSettings) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  errorElement.classList.remove(validationSettings.errorClass);
  errorElement.textContent = '';
  input.classList.remove(validationSettings.inputErrorClass);
}

function isValid(form, input, validationSettings) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage)
  } else if (input.validity.valueMissing) {
    input.setCustomValidity(input.dataset.skipMessage)
  } else if (input.validity.typeMismatch) {
    input.setCustomValidity(input.dataset.errorMessage)
  } else {
    input.setCustomValidity('')
  }

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, validationSettings);
  } else {
    hideInputError(form, input, validationSettings);
  }

  checkFormValidity(form, validationSettings);
}

function setEventListenersOnInput(form, validationSettings) {
  const inputList = Array.from(form.querySelectorAll(validationSettings.inputClass));
  inputList.forEach((input) => {
    input.addEventListener('input', () => isValid(form, input, validationSettings))
  })
}

function enableValidation(validationSettings) {
  const popupFormList = Array.from(document.querySelectorAll(validationSettings.formClass));
  popupFormList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    setEventListenersOnInput(form, validationSettings);
  })
}

function clearValidation(popup, validationSettings) {
  const form = popup.querySelector(validationSettings.formClass);
  const inputList = Array.from(form.querySelectorAll(validationSettings.inputClass));

  if (form) {
    form.reset()
  }

  inputList.forEach((input) => {
    hideInputError(form, input, validationSettings);
  })
}

export { validationSettings, disableButton, enableValidation, clearValidation }
