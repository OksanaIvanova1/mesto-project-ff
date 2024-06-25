import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import { loadDataApi, editAvatarApi, editProfileApi, addCardApi, deleteCardApi } from "./api.js";

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

loadDataApi()
  .then(([user, cards]) => {
  profileName.textContent = user.name;
  profileAbout.textContent = user.about;
  profileAvatar.style.backgroundImage = `url(${user.avatar})`;
  const currentUserID = user._id;

  cards.forEach((card) => {
    const cardNew = createCard(card, cardTemplate, deleteCard, likeCard, openImage, currentUserID);
    placesList.append(cardNew);
    })
  })
  .catch((err) => {
    console.log(err);
  }); 
;

const popupAll = document.querySelectorAll(".popup");
popupAll.forEach(function (element) {
	element.classList.add("popup_is-animated");
	
	const buttonClose = element.querySelector(".popup__close");
  buttonClose.addEventListener("click", function (evt) {
    closeModal(element);
  });

  element.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup")) {
      closeModal(element);
    }
  });
});


function renderLoading(button, isLoading) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

const avatarPopup = document.querySelector(".popup_type_new-avatar");
const avatar = document.querySelector(".profile__image");
const newAvatar = document.forms["new-avatar"];
const avatarLinkInput = newAvatar.link;
avatar.addEventListener("click", function (evt) {
  openModal(avatarPopup);

  newAvatar.reset();
  
  clearValidation(newAvatar, validationConfig);
});

const btnSaveAvatar = avatarPopup.querySelector(".popup__button");

function handleNewAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(btnSaveAvatar, true);
  editAvatarApi(avatarLinkInput.value)
  .then((res) => {
    profileAvatar.style.backgroundImage = `url(${res.avatar})`;
    closeModal(avatarPopup);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(btnSaveAvatar, false);
  }); 
}
newAvatar.addEventListener("submit", handleNewAvatarSubmit);

const buttonEditProfile = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editProfileForm = document.forms["edit-profile"];
const profileNameInput = editProfileForm.name;
const profileJobInput = editProfileForm.description;

buttonEditProfile.addEventListener("click", function (evt) {
  openModal(editPopup);
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;

  clearValidation(editProfileForm, validationConfig); 
});
const btnSaveProfile = editPopup.querySelector(".popup__button");

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  renderLoading(btnSaveProfile, true);
  editProfileApi(profileNameInput.value, profileJobInput.value)
  .then((res) => {
    profileTitle.textContent = res.name;
    profileDescription.textContent = res.about;
    closeModal(editPopup);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(btnSaveProfile, false);
  }); 
}
editProfileForm.addEventListener("submit", handleEditProfileSubmit);

const buttonAdd = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_type_new-card");
const newPlaceForm = document.forms["new-place"];
const placeNameInput = newPlaceForm["place-name"];
const placeLinkInput = newPlaceForm.link;

buttonAdd.addEventListener("click", function (evt) {
  openModal(addPopup);
  newPlaceForm.reset();

  clearValidation(newPlaceForm, validationConfig); 
});

const btnSavePlace = addPopup.querySelector(".popup__button");

function handleNewPlaceSubmit(evt) {
  evt.preventDefault();
  renderLoading(btnSavePlace, true);
  
  addCardApi(placeNameInput.value, placeLinkInput.value)
  .then((result) => {
    const newCard = createCard(result, cardTemplate, deleteCard, likeCard, openImage, result.owner._id);
    placesList.prepend(newCard);
    closeModal(addPopup);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(btnSavePlace, false);
  });  
}
newPlaceForm.addEventListener("submit", handleNewPlaceSubmit);

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupSrc = document.querySelector(".popup__image");
const imagePopupName = document.querySelector(".popup__caption");
function openImage(cardImageSrc, cardTitle) {
  openModal(imagePopup);

	imagePopupSrc.setAttribute("src", cardImageSrc);
  imagePopupSrc.setAttribute("alt", cardTitle);
	imagePopupName.textContent = cardTitle;
}

enableValidation(validationConfig);