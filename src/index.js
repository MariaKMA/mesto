import {initialCards, popupTypeUser, popupTypePlace,
    popupViewPic, popupTypeUserCloseBtn, popupTypePlaceCloseBtn,
    popupViewPicCloseBtn, formElementTypeUser, formElementTypePlace,
    placeCaptionInput, placeLinkInput, profileEditBtn, profileUserName,
    profileUserInterest, inputUserName, inputUserInterest, cardsSection,
    profileAddBtn, config, forms
} from "./data.js";

import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import {openPopup} from "./openPopup.js";
import {closePopup} from "./closePopup.js";





// // Закрыть попап

// function closePopup(popup) {
//     popup.classList.remove('popup_active');
//     document.removeEventListener('keydown', closePopupEsc);
//     document.removeEventListener('click', closePopupOverlay);
// }

// // Закрыть попап по нажатию на esc

// function closePopupEsc(evt) {
//     if (evt.key === 'Escape') {
//         const popup = document.querySelector('.popup_active');
//         closePopup(popup);
//     }
// }

// // Закрыть попап по нажатию на overlay

// function closePopupOverlay(evt) {
//     if (evt.target.classList.contains('popup_active')) {
//         closePopup(evt.target);
//     }
// }

// Открыть попап редактирования пользователя

profileEditBtn.addEventListener('click', openPopupEditForm);

function openPopupEditForm() {
    openPopup(popupTypeUser);
    inputUserName.value = profileUserName.textContent;
    inputUserInterest.value = profileUserInterest.textContent;
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


// Вывести карточки на страницу по данным из массива

initialCards.forEach(item => {
    const card = new Card(item.link, item.name, '.card-template');
    const cardElement = card.generate();
    cardsSection.append(cardElement);
})

// Открыть попап добавления новой карточки и провалидировать форму

profileAddBtn.addEventListener('click', openPopupAddCard);

function openPopupAddCard() {
    openPopup(popupTypePlace);
    formElementTypePlace.reset();

    // Деактивировать кнопку сабмита при открытии формы
    const addCardValidator = new FormValidator(config, formElementTypePlace);
    addCardValidator.disableAddCardSubmit();
}


// Закрыть попап добавления новой карточки

popupTypePlaceCloseBtn.addEventListener('click', () => {closePopup(popupTypePlace);});


//  Добавить на страницу новую карточку

function handleAddFormSubmit(evt) {
    evt.preventDefault();

    const card = new Card(placeLinkInput.value, placeCaptionInput.value, '.card-template');
    const cardElement = card.generate();

    cardsSection.prepend(cardElement);

    placeCaptionInput.value = '';
    placeLinkInput.value = '';

    closePopup(popupTypePlace);
}

formElementTypePlace.addEventListener('submit', handleAddFormSubmit);



// Закрыть попап с картинкой

popupViewPicCloseBtn.addEventListener('click', () => {closePopup(popupViewPic)});


forms.forEach(form => {
    const validator = new FormValidator(config, form);
    validator.enableValidation();
})

