import { checkResponse } from "./utils.js";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-16',
  headers: {
    authorization: '8e1daac8-b53a-498b-aaa0-151b0abaa877',
    'Content-Type': 'application/json'
  }
}

export function loadDataApi() {
  return Promise.all([
    fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
    .then(checkResponse),
      
    fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(checkResponse)
  ])
}

export function editAvatarApi(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: link
      })
  })
  .then(checkResponse)
}

export function editProfileApi(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name,
        about
      })
  })
  .then(checkResponse)
}

export function addCardApi(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name,
        link
      })
  })
  .then(checkResponse)
}

export function deleteCardApi(cardID) {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResponse)
}

export function addLikeApi(cardID) {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: 'PUT',
      headers: config.headers
  })
  .then(checkResponse)
}

export function deleteLikeApi(cardID) {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: 'DELETE',
      headers: config.headers
  })
  .then(checkResponse)
}