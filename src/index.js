import {initialCards, popupTypeUser, popupTypePlace,
    popupViewPic, popupTypeUserCloseBtn, popupTypePlaceCloseBtn,
    popupViewPicCloseBtn, formElementTypeUser, formElementTypePlace,
    placeCaptionInput, placeLinkInput, profileEditBtn, profileUserName,
    profileUserInterest, inputUserName, inputUserInterest, cardsSection,
    profileAddBtn, config, forms
} from "./data.js";

import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import Card from "./Card.js";
import {openPopup} from "./openPopup.js";
import {closePopup} from "./closePopup.js";


// Открыть попап редактирования пользователя

profileEditBtn.addEventListener('click', openPopupEditForm);

function openPopupEditForm() {
    inputUserName.value = profileUserName.textContent;
    inputUserInterest.value = profileUserInterest.textContent;
    openPopup(popupTypeUser);
}


// Закрыть попап редактирования пользователя при нажатии на крестик

popupTypeUserCloseBtn.addEventListener('click', () => {closePopup(popupTypeUser)});


// Редактировать профиль и отправить форму

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileUserName.textContent = inputUserName.value;
    profileUserInterest.textContent = inputUserInterest.value;
    closePopup(popupTypeUser);
}

formElementTypeUser.addEventListener('submit', handleProfileFormSubmit);








// Запустить валидацию форм

const validatorUserForm = new FormValidator(config, formElementTypeUser);
validatorUserForm.enableValidation();

const validatorPlaceForm = new FormValidator(config, formElementTypePlace);
validatorPlaceForm.enableValidation();


// Открыть попап добавления новой карточки и провалидировать форму

profileAddBtn.addEventListener('click', openPopupAddCard);

function openPopupAddCard() {
    openPopup(popupTypePlace);
    formElementTypePlace.reset();

    // Деактивировать кнопку сабмита при открытии формы
    validatorPlaceForm.setSubmitButtonState();
}


// Закрыть попап добавления новой карточки

popupTypePlaceCloseBtn.addEventListener('click', () => {closePopup(popupTypePlace);});



// Создать разметку карточки

// function generateCard(link, name, selector) {
//     const card = new Card(link, name, selector);
//     const cardElement = card.generate();
//     return cardElement;
// }

// // Вывести карточки на страницу по данным из массива

// initialCards.forEach(item => {
//     const cardElement = generateCard(item.link, item.name, '.card-template');
//     cardsSection.append(cardElement);
// })

//  Добавить на страницу новую карточку

// function handleAddFormSubmit(evt) {
//     evt.preventDefault();

//     const cardElement = generateCard(placeLinkInput.value, placeCaptionInput.value, '.card-template');
//     cardsSection.prepend(cardElement);

//     closePopup(popupTypePlace);

//     placeCaptionInput.value = '';
//     placeLinkInput.value = '';
// }


// formElementTypePlace.addEventListener('submit', handleAddFormSubmit);

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item.link, item.name, '.card-template');
        const cardElement = card.generate();
        cardList.addAppendItem(cardElement);
    }
}, cardsSection);

cardList.renderItems();


const cardItem = new Section({
    items: [{}],
    renderer: () => {
        const card = new Card(placeLinkInput.value, placeCaptionInput.value, '.card-template');
        const cardElement = card.generate();
        cardItem.addPrependItem(cardElement);
    }
}, cardsSection);

formElementTypePlace.addEventListener('submit', () => {cardItem.renderItems()});



// Закрыть попап с картинкой

popupViewPicCloseBtn.addEventListener('click', () => {closePopup(popupViewPic)});



