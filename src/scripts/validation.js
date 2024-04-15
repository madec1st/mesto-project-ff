const validationSettings = {
  formClass: '.popup__form',
  inputClass: '.popup__input',
  submitButtonClass: '.popup__button',
  inactiveButtonClass: 'popup__button-inactive',
  inputErrorClass: 'popup__input-invalid',
  errorSpanClass: 'popup__input-error',
  errorClass: 'popup__input-error_active'
}

function clearValidation(popup, validationSettings) {
  const form = popup.querySelector(validationSettings.formClass);
  const inputList = Array.from(form.querySelectorAll(validationSettings.inputClass));
  const errorElements = Array.from(form.querySelectorAll(`.${validationSettings.errorSpanClass}`));

  if (form) {
    form.reset()
  }

  inputList.forEach((input) => {
    input.classList.remove(validationSettings.inputErrorClass);
  })
  
  errorElements.forEach((error) => {
    error.classList.remove(validationSettings.errorClass);
    error.textContent = '';
  })
}

export { validationSettings, clearValidation }
