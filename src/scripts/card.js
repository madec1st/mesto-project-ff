const cardTemplate = document.querySelector('#card-template').content;

const createCard = (cardItem, openImage, likeCard, deleteCard) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent = cardItem.name;
  card.querySelector('.card__image').src = cardItem.link;
  card.querySelector('.card__image').alt = cardItem.name;

  const cardImage = card.querySelector('.card__image');
  cardImage.addEventListener('click', () => openImage(cardItem));

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);

  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', likeCard)

  return card;
};

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
};

function deleteCard(evt) {
  const deletedCard = evt.target.closest('.card');
  deletedCard.remove();
};

export { createCard, likeCard, deleteCard };