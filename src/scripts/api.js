import { checkResponse } from "./utils"

const fetchSettings = {
  url: 'https://mesto.nomoreparties.co/v1/wff-cohort-11',
  headers: {
    authorization: '8eef8a7b-16fa-42a1-80e9-e1a5157a1c81',
    'Content-Type': 'application/json'
  }
}

function getUserData() {
  return fetch(`${fetchSettings.url}/users/me`, {
    method: 'GET',
    headers: fetchSettings.headers
  })
    .then(checkResponse)
}

function editProfile(nameInput, jobInput) {
  return fetch(`${fetchSettings.url}/users/me`, {
    method: 'PATCH',
    headers: fetchSettings.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    }),
  })
    .then(checkResponse)
}

function getCards() {
  return fetch(`${fetchSettings.url}/cards`, {
    method: 'GET',
    headers: fetchSettings.headers
  })
    .then(checkResponse)
}

function postCard(titleInput, linkInput) {
  return fetch(`${fetchSettings.url}/cards`, {
    method: 'POST',
    headers: fetchSettings.headers,
    body: JSON.stringify({
      name: titleInput.value,
      link: linkInput.value
    })
  })
    .then(checkResponse)
}

function deleteCardById(cardID) {
  return fetch(`${fetchSettings.url}/cards/${cardID}`, {
    method: 'DELETE',
    headers: fetchSettings.headers
  })
    .then(checkResponse)
}

function setLike(cardID) {
  return fetch(`${fetchSettings.url}/cards/likes/${cardID}`, {
    method: 'PUT',
    headers: fetchSettings.headers
  })
    .then(checkResponse)
}

function removeLike(cardID) {
  return fetch(`${fetchSettings.url}/cards/likes/${cardID}`, {
    method: 'DELETE',
    headers: fetchSettings.headers
  })
    .then(checkResponse)
}

function changeAvatar(linkInput) {
  return fetch(`${fetchSettings.url}/users/me/avatar`, {
    method: 'PATCH',
    headers: fetchSettings.headers,
    body: JSON.stringify({
      avatar: linkInput.value
    })
  })
    .then(checkResponse)
}

export { getUserData, editProfile, getCards, postCard, deleteCardById, setLike, removeLike, changeAvatar }