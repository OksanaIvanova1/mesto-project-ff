// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const button = cardTemplate.querySelector('.card__delete-button');

// @todo: Функция создания карточки
function createCard(element, deleteCard) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

	cardElement.querySelector('.card__image').src = element.link;
	cardElement.querySelector('.card__image').alt = element.name;
	cardElement.querySelector('.card__title').textContent = element.name;

	cardElement.querySelector('.card__delete-button').addEventListener('click', function() {
		deleteCard(cardElement);
	})

	return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(card) {
	card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(element){
	const cardNew = createCard(element, deleteCard);
	placesList.append(cardNew);
});