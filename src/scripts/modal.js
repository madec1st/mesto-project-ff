const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function fillUserData() {
  const currentUserName = profileTitle.textContent;
  const currentUserJob = profileDescription.textContent;

  nameInput.value = currentUserName;
  jobInput.value = currentUserJob;
}

fillUserData();

function resetForm(popup) {
  const form = popup.querySelector('.popup__form');
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const errorElements = Array.from(form.querySelectorAll('.popup__input-error'));

  if (form) {
    form.reset()
  }

  inputList.forEach((input) => {
    input.classList.remove('popup__input-invalid');
  })
  
  errorElements.forEach((error) => {
    error.classList.remove('popup__input-error_active');
    error.textContent = '';
  })
}

function openPopup(popup, profileFlag) {
  setTimeout(function() {
    popup.classList.add('popup_is-opened');
    if (profileFlag) {
      resetForm(popup);
      fillUserData();
    } else {
      resetForm(popup);
    }
  }, 100);
  popup.classList.add('popup_is-animated');

  document.addEventListener('click', closeBySpaceAround);
  document.addEventListener('keydown', closeByEsc);
};

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('click', closeBySpaceAround);
  document.removeEventListener('keydown', closeByEsc);
};

function closeBySpaceAround(evt) {
  const activePopup = document.querySelector('.popup_is-opened');
  if (activePopup === evt.target) { 
    closePopup(activePopup);
  }
};

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_is-opened');
    closePopup(activePopup);
  }
};

export { nameInput, jobInput, profileTitle, profileDescription, openPopup, closePopup }