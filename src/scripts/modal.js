import { createCard, deleteCard } from './card.js'

function openImage(item) {
  const popupImage = document.querySelector('.popup_type_image');
  setTimeout(function() {
    popupImage.classList.add('popup_is-opened')
  }, 100);
  popupImage.classList.add('popup_is-animated');
  popupImage.querySelector('.popup__image').src = item.link;
  popupImage.querySelector('.popup__image').alt = item.name;
  popupImage.querySelector('.popup__caption').textContent = item.name;

  window.addEventListener('click', function(evt) {
    if(evt.target === popupImage) {
      popupImage.classList.remove('popup_is-opened')
    }
  })

  window.addEventListener('keydown', function(evt) {
    if(evt.key === 'Escape') {
      popupImage.classList.remove('popup_is-opened')
    }
  })
};

function openPopup(pattern) {
  const popup = pattern;
  setTimeout(function() {
    popup.classList.add('popup_is-opened')
  }, 100);
  popup.classList.add('popup_is-animated');

  userData();

  window.addEventListener('click', function(evt) {
    if(evt.target === popup) {
      popup.classList.remove('popup_is-opened')
    }
  })

  window.addEventListener('keydown', function(evt) {
    if(evt.key === 'Escape') {
      popup.classList.remove('popup_is-opened')
    }
  })
}

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function userData() {
  const currentUserName = profileTitle.textContent;
  const currentUserJob = profileDescription.textContent;

  nameInput.value = currentUserName;
  jobInput.value = currentUserJob;
}

function handleFormSubmitUser(evt) {
  evt.preventDefault();
  const userName = nameInput.value;
  const userJob = jobInput.value;

  profileTitle.textContent = userName;
  profileDescription.textContent = userJob;

  evt.target.closest('.popup').classList.remove('popup_is-opened');
}

const cardFormElement = document.forms['new-place'];
const titleInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');

function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const region = titleInput.value;
  const imageLink = linkInput.value;

  const newCard = {
    name: region,
    link: imageLink
  }

  const addNewCard = (newCard) => {
    const card = createCard(newCard, openImage, deleteCard);
    const cardsContainer = document.querySelector('.places__list');
    cardsContainer.prepend(card);
  }

  addNewCard(newCard);

  cardFormElement.reset();

  evt.target.closest('.popup').classList.remove('popup_is-opened');
}

export { openImage, openPopup, handleFormSubmitUser, cardFormElement, handleFormSubmitCard }