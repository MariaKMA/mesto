import './index.css';

import {initialCards, formElementTypeUser, formElementTypePlace,
    profileEditBtn, inputUserName, inputUserInterest, cardsSection,
    profileAddBtn, config
} from "../utils/constants.js";

import FormValidator from "../components/FormValidator";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from "../components/UserInfo.js";


// Экземпляр класса PopupWithForm - для формы редактирования профиля
const popupEditForm = new PopupWithForm('.popup_type_user', handleProfileFormSubmit);
popupEditForm.setEventListeners();

// Экземпляр класса PopupWithForm - для формы добавления новой карточки
const popupAddCard = new PopupWithForm('.popup_type_place', handleAddCardFormSubmit);
popupAddCard.setEventListeners();

// Экземпляр класса popupTypeViewPic - для попапа просмотра картинки
const popupTypeViewPic = new PopupWithImage(null, null, '.popup_type_view-pic');
popupTypeViewPic.setEventListeners();

// Экземпляр класса UserInfo
const profileUserInfo = new UserInfo({userNameSelector: '.profile__user-name', userInterestSelector: '.profile__user-interest'});

// Запуск валидации форм
const validatorUserForm = new FormValidator(config, formElementTypeUser);
validatorUserForm.enableValidation();

const validatorPlaceForm = new FormValidator(config, formElementTypePlace);
validatorPlaceForm.enableValidation();

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

// Открываем попап добавления новой карточки
function openPopupAddCard() {
    popupAddCard.open();
    validatorPlaceForm.setSubmitButtonState(); // Деактивируем кнопку сабмита при открытии формы
}

// Функция создания новой карточки
function createCard(link, title) {
    const card = new Card(link, title, '.card-template', (link, title) => {
        const popupWithImage = new PopupWithImage(link, title, '.popup_type_view-pic');
        popupWithImage.open();
    });
    return card.generate();
}

// Экземпляр класса Section - добавление карточек на страницу
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = createCard(item.link, item.name);
        cardList.addItem(card)
    }
}, cardsSection);

// Отрисовываем на странице карточки из массива
cardList.renderItems();

// Обработчик сабмита формы добавления новой карточки
function handleAddCardFormSubmit(values) {
    const card = createCard(values.imageLink, values.placeTitle);
    cardList.addItem(card);
    popupAddCard.close();
}

// Слушатель клика по кнопке редактирования профиля
profileEditBtn.addEventListener('click', openPopupEditForm);

// Слушатель клика по кнопке добавления новой карточки
profileAddBtn.addEventListener('click', openPopupAddCard);