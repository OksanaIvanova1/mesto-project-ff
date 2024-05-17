const arkhyzImageLink = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg", import.meta.url);
const chelyabinskImageLink = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg", import.meta.url);
const ivanovoImageLink = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg", import.meta.url);
const kamchatkaImageLink = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg", import.meta.url);
const kholmogorskImageLink = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg", import.meta.url);
const baikalImageLink = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg", import.meta.url);

export const initialCards = [
  { name: "Архыз",
    link: arkhyzImageLink,
  },
  {
    name: "Челябинская область",
    link: chelyabinskImageLink,
  },
  {
    name: "Иваново",
    link: ivanovoImageLink,
  },
  {
    name: "Камчатка",
    link: kamchatkaImageLink,
  },
  {
    name: "Холмогорский район",
    link: kholmogorskImageLink,
  },
  {
    name: "Байкал",
    link: baikalImageLink,
  },
];

