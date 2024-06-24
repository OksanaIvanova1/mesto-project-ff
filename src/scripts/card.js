import { deleteCardApi, addLikeApi, deleteLikeApi } from "./api.js";

export function createCard(element, cardTemplate, deleteCard, likeCard, openImage, currentUserID) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeCount = cardElement.querySelector(".card__like-count");

  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;
  likeCount.textContent = element.likes.length;

  const likeButton = cardElement.querySelector(".card__like-button");
  element.likes.forEach(function(users) {
    if (users._id === currentUserID) {
      likeButton.classList.add("card__like-button_is-active");
    }
  })

  likeButton.addEventListener("click", function () {
    likeCard(cardElement, likeButton, element._id);
  })

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (element.owner._id !== currentUserID) {
    deleteButton.hidden  = true;
  }

  deleteButton.addEventListener("click", function () {
    deleteCard(cardElement, element._id);
  });

  cardImage.addEventListener("click", function () {
    openImage(cardImage.src, cardTitle.textContent);
  });

  return cardElement;
}

export function deleteCard(card, cardID) {
  deleteCardApi(cardID)
  .then(() => {
    card.remove();
  })
  .catch((err) => {
    console.log(err);
  });
}

export function likeCard(card, button, cardID) {
  const likeCount = card.querySelector(".card__like-count");
  if (button.classList.contains("card__like-button_is-active")) {
    deleteLikeApi(cardID)
    .then((result) => {
      likeCount.textContent = result.likes.length;
      button.classList.remove("card__like-button_is-active");
    })
  } else {
    addLikeApi(cardID)
    .then((result) => {
      likeCount.textContent = result.likes.length;
      button.classList.add("card__like-button_is-active");
    });
  }
}
