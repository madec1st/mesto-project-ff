function openPopup(popup) {
  setTimeout(function() {
    popup.classList.add('popup_is-opened');
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
  if (evt.target.classList.contains('popup_is-opened')) { 
    closePopup(evt.target);
  }
};

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_is-opened');
    closePopup(activePopup);
  }
};

export { openPopup, closePopup }