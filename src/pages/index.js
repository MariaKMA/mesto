import './index.css';

import {initialCards,
    popupViewPicCloseBtn, formElementTypeUser, formElementTypePlace,
    placeCaptionInput, placeLinkInput, profileEditBtn, inputUserName, inputUserInterest, cardsSection,
    profileAddBtn, config
} from "../data.js";

// import FormValidator from "../FormValidator.js";
import FormValidator from "../components/FormValidator";

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from "../components/UserInfo.js";


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


// Открываем попап добавления новой карточки
function openPopupAddCard() {
    popupAddCard.open();
    validatorPlaceForm.setSubmitButtonState(); // Деактивируем кнопку сабмита при открытии формы
}


// Экземпляр класса Section для добавления карточек из массива
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item.link, item.name, '.card-template', () => {
            const popupWithImage = new PopupWithImage(item.link, item.name, '.popup_type_view-pic');
            popupWithImage.open();
            });
        const cardElement = card.generate();
        cardList.addAppendItem(cardElement);
    }
}, cardsSection);

// Отрисовываем на странице карточки из массива
cardList.renderItems();


// Создаём экземпляр класса PopupWithForm - для формы добавления новой карточки
const popupAddCard = new PopupWithForm('.popup_type_place', handleAddFormSubmit);
popupAddCard.setEventListeners();

// Функция-обработчик сабмита формы добавления новой карточки
function handleAddFormSubmit() {
    cardItem.renderItems(); // добавляем карточку на страницу
    popupAddCard.close();
}

// Экземпляр класса Section для добавления карточки с помощью формы
const cardItem = new Section({
    items: [{}],
    renderer: () => {
        const card = new Card(placeLinkInput.value, placeCaptionInput.value, '.card-template', (link, name) => {
            const popupWithImage = new PopupWithImage(link, name, '.popup_type_view-pic');
            popupWithImage.open();
            });
        const cardElement = card.generate();
        cardList.addPrependItem(cardElement);
    }
}, cardsSection);


// Слушатель клика по кнопке редактирования профиля
profileEditBtn.addEventListener('click', openPopupEditForm);

// Слушатель клика по кнопке добавления новой карточки
profileAddBtn.addEventListener('click', openPopupAddCard);

// Слушатель клика по кнопке закрытия попапа с картинкой
popupViewPicCloseBtn.addEventListener('click', () => {
    const popupTypeViewPic = new Popup('.popup_type_view-pic');
    popupTypeViewPic.close()
});



