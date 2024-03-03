// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const card = cardTemplate.querySelector('.card').cloneNode(true);

// @todo: DOM узлы
initialCards.forEach((template) => {
  card.querySelector('.card__title').textContent = template.name;
  card.querySelector('.card__image').src = template.link;
  card.querySelector('.card__image').alt = template.name;
});


// @todo: Функция создания карточки
function createCard() {
  const cardsContainer = document.querySelector('.places__list');
  cardsContainer.append(card);


  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);
}

// @todo: Функция удаления карточки
function deleteCard() {

}

// @todo: Вывести карточки на страницу
createCard();