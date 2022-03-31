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
import Popup from './Popup.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from "./UserInfo.js";


// Слушатель клика по кнопке редактирования профиля
profileEditBtn.addEventListener('click', openPopupEditForm);

// Экземпляр класса PopupWithForm - для формы редактирования профиля
const popupEditForm = new PopupWithForm('.popup_type_user', handleProfileFormSubmit);
popupEditForm.setEventListeners();

// Экземпляр класса UserInfo
const profileUserInfo = new UserInfo({userNameSelector: '.profile__user-name', userInterestSelector: '.profile__user-interest'});


// Открываем попап с формой редактирования профиля
function openPopupEditForm() {
    const userData = profileUserInfo.getUserInfo(); // получаем объект с данными пользователя, которые вставляем в открываемую форму
    inputUserName.value = userData.userName;
    inputUserInterest.value = userData.userInterest;
    popupEditForm.open();
}

// Обработчик сабмита формы редактирования профиля
function handleProfileFormSubmit(userData) {
    profileUserInfo.setUserInfo(userData); // данные из инпутов записываем на страницу в профиль пользователя
    popupEditForm.close();
}

// Запуск валидации форм
const validatorUserForm = new FormValidator(config, formElementTypeUser);
validatorUserForm.enableValidation();

const validatorPlaceForm = new FormValidator(config, formElementTypePlace);
validatorPlaceForm.enableValidation();


// Создаём экземпляр класса PopupWithForm - для формы добавления новой карточки
const popupAddCard = new PopupWithForm('.popup_type_place', handleAddFormSubmit);
popupAddCard.setEventListeners();

// Слушатель клика по кнопке добавления новой карточки
profileAddBtn.addEventListener('click', openPopupAddCard);

// Открываем попап добавления новой карточки
function openPopupAddCard() {
    popupAddCard.open();
    validatorPlaceForm.setSubmitButtonState(); // Деактивируем кнопку сабмита при открытии формы
}

// Функция-обработчик сабмита формы добавления новой карточки
function handleAddFormSubmit() {
    cardItem.renderItems(); // добавляем карточку на страницу
    popupAddCard.close();
}

// Экземпляр класса Section для добавления карточек из массива
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item.link, item.name, '.card-template');
        const cardElement = card.generate();
        cardList.addAppendItem(cardElement);
    }
}, cardsSection);

cardList.renderItems();


// Экземпляр класса Section для добавления карточки с помощью формы
const cardItem = new Section({
    items: [{}],
    renderer: () => {
        const card = new Card(placeLinkInput.value, placeCaptionInput.value, '.card-template');
        const cardElement = card.generate();
        cardItem.addPrependItem(cardElement);
    }
}, cardsSection);


// Слушатель клика по кнопке закрытия попапа с картинкой
popupViewPicCloseBtn.addEventListener('click', () => {
    const popupTypeViewPic = new Popup('.popup_type_view-pic');
    popupTypeViewPic.close()
});



