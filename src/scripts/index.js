import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";

export const cardTemplate = document.querySelector("#card-template").content;

const placesList = document.querySelector(".places__list");
initialCards.forEach(function (element) {
  const cardNew = createCard(element, deleteCard, likeCard, openImage);
  placesList.append(cardNew);
});

const popupAll = document.querySelectorAll(".popup");
popupAll.forEach(function (element) {
	element.classList.add("popup_is-animated");
});

const buttonEdit = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editProfileForm = document.forms["edit-profile"];
const profileNameInput = editProfileForm.name;
const profileJobInput = editProfileForm.description;

buttonEdit.addEventListener("click", function (evt) {
  openModal(editPopup);

  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileJobInput.value;

  closeModal(editPopup);
}
editProfileForm.addEventListener("submit", handleEditProfileSubmit);


const buttonAdd = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_type_new-card");
const newPlaceForm = document.forms["new-place"];
const placeNameInput = newPlaceForm["place-name"];
const placeLinkInput = newPlaceForm.link;

buttonAdd.addEventListener("click", function (evt) {
  openModal(addPopup);
  placeNameInput.value = "";
  placeLinkInput.value = "";
});

function handleNewPlaceSubmit(evt) {
  evt.preventDefault();

  const newPlaceCard = {};
  newPlaceCard.name = placeNameInput.value;
  newPlaceCard.link = placeLinkInput.value;

  const newCard = createCard(newPlaceCard, deleteCard, likeCard, openImage);
  placesList.prepend(newCard);

  placeNameInput.value = "";
  placeLinkInput.value = "";

  closeModal(addPopup);
}
newPlaceForm.addEventListener("submit", handleNewPlaceSubmit);


const imagePopup = document.querySelector(".popup_type_image");
const imagePopupSrc = document.querySelector(".popup__image");
const imagePopupName = document.querySelector(".popup__caption");
function openImage(cardImageSrc, cardTitle) {
  openModal(imagePopup);

	imagePopupSrc.setAttribute("src", cardImageSrc);
	imagePopupName.textContent = cardTitle;
}
