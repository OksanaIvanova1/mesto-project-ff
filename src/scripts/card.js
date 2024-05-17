export function createCard(element, cardTemplate, deleteCard, likeCard, openImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
      deleteCard(cardElement);
    });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
      likeCard(likeButton);
    });

  cardImage.addEventListener("click", function () {
    openImage(cardImage.src, cardTitle.textContent);
  });

  return cardElement;
}

export function deleteCard(card) {
  card.remove();
}

export function likeCard(button) {
  button.classList.toggle("card__like-button_is-active");
}
