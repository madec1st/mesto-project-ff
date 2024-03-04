// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу


const cardTemplate = document.querySelector('#card-template').content;

initialCards.forEach((template) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent = template.name;
  card.querySelector('.card__image').src = template.link;
  card.querySelector('.card__image').alt = template.name;

  const cardsContainer = document.querySelector('.places__list');
  cardsContainer.append(card);

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);
});

function deleteCard(evt) {
  const deletedCard = evt.target.closest('.card');
  deletedCard.remove();
};