const cardTemplate = document.querySelector('#card-template').content;

const createCard = (cardItem, openImage, deleteCard) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent = cardItem.name;
  card.querySelector('.card__image').src = cardItem.link;
  card.querySelector('.card__image').alt = cardItem.name;

  const cardImage = card.querySelector('.card__image');
  cardImage.addEventListener('click', () => openImage(cardItem));

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);

  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', function(evt) {
      if(evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active')
      }
    })

  return card;
};

function deleteCard(evt) {
  const deletedCard = evt.target.closest('.card');
  deletedCard.remove();
};

export { createCard, deleteCard };