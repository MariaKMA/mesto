import './index.css';

import {formElementTypeUser, formElementTypePlace, formElementTypeAvatar,
    profileEditBtn, inputUserName, inputUserInterest, cardsSection,
    profileAddBtn, config, profileAvatarAria, profileAvatarEditBtn
} from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithDeleteCard from '../components/PopupWithDeleteCard.js'

// Экземпляр класса Api
const api = new Api({
        baseUrl: 'https://nomoreparties.co/v1/cohort-40',
        headers: {
            'authorization': 'f09c6838-ffad-47d4-ac9e-28f932775532',
            'Content-Type': 'application/json'
        }
});

// Экземпляр класса UserInfo
const profileUserInfo = new UserInfo({userNameSelector: '.profile__user-name', userInterestSelector: '.profile__user-interest', avatarSelector: '.profile__avatar'});

// Получаем с сервера и выводим на страницу данные пользователя и начальные карточки
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
        profileUserInfo.setUserInfo(userData);
        profileUserInfo.setAvatar(userData);
        profileUserInfo.setUserId(userData);

        cardList.renderItems(cards);
    })
    .catch((err) => {
        console.log(err);
    });

// Экземпляр класса PopupWithForm - для формы редактирования профиля
const popupEditForm = new PopupWithForm('.popup_type_user', handleProfileFormSubmit);
popupEditForm.setEventListeners();

// Экземпляр класса PopupWuthForm - для формы редактирования аватара
const popupEditAvatar = new PopupWithForm('.popup_type_avatar', handleEditAvatarSubmit);
popupEditAvatar.setEventListeners();

// Экземпляр класса PopupWithForm - для формы добавления новой карточки
const popupAddCard = new PopupWithForm('.popup_type_place', handleAddCardFormSubmit);
popupAddCard.setEventListeners();

// Экземпляр класса PopupWithDeleteCard - для удаления карточки
const popupDeleteCard = new PopupWithDeleteCard('.popup_type_delete-card');
popupDeleteCard.setEventListeners();

// Экземпляр класса PopupWithImage - для просмотра карточки
const popupWithImage = new PopupWithImage('.popup_type_view-pic');
popupWithImage.setEventListeners();


// Редактирование аватарки: отправляем на сервер новую ссылку и отрисовываем
function handleEditAvatarSubmit(values) {
    const link = values.avatarLink;

    // Меняем текст кнопки на Сохранение...
    popupEditAvatar.changeBtnText();

    api.editAvatar(link)
        .then((res) => {
            profileUserInfo.setAvatar(res);
            popupEditAvatar.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupEditAvatar.changeBackBtnText();
        });
}

// Запуск валидации форм
const validatorUserForm = new FormValidator(config, formElementTypeUser);
validatorUserForm.enableValidation();

const validatorPlaceForm = new FormValidator(config, formElementTypePlace);
validatorPlaceForm.enableValidation();

const validatorAvatarForm = new FormValidator(config, formElementTypeAvatar);
validatorAvatarForm.enableValidation();

// Открываем попап с формой редактирования профиля
function openPopupEditForm() {
    const userData = profileUserInfo.getUserInfo(); // получаем объект с данными пользователя, которые вставляем в открываемую форму
    inputUserName.value = userData.userName;
    inputUserInterest.value = userData.userInterest;
    popupEditForm.open();
}

// Обработчик сабмита формы редактирования профиля
function handleProfileFormSubmit(userData) {

    // меняем текст кнопки на Сохранение...
    popupEditForm.changeBtnText();

    // отправляем обновленные данные на сервер
    api.updateUserInfo(userData.userName, userData.userInterest)
        .then((res) => {
            // данные из инпутов после удачного ответа сервера записываем на страницу в профиль пользователя
            profileUserInfo.setUserInfo(res);
            popupEditForm.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupEditForm.changeBackBtnText();
        });
}

// Обработчик наведения мыши на аватар
function showAvatarEditIcon(evt) {
    evt.target.style.opacity = '0.8';
    evt.target.style.backgroundColor = 'black';
    profileAvatarEditBtn.style.visibility = 'visible';
}

// Обработчик ухода указателя мыши с аватара
function hideAvatarEditIcon(evt) {
    evt.target.style.opacity = '1';
    profileAvatarEditBtn.style.visibility = 'hidden';
}

// Обработчик клика по кнопке редактирования аватара
function openPopupEditAvatar() {
    popupEditAvatar.open();
    validatorAvatarForm.setSubmitButtonState(); // Деактивируем кнопку сабмита при открытии формы
}

// Открываем попап добавления новой карточки
function openPopupAddCard() {
    popupAddCard.open();
    validatorPlaceForm.setSubmitButtonState(); // Деактивируем кнопку сабмита при открытии формы
}

// Функция создания карточки
function createCard(link, title, likes, cardId, canDelete, likeActive) {
    const card = new Card(
        link,
        title,
        likes,
        '.card-template',
        canDelete, // флаг для отметки карточек, созданных нашим пользователем и пригодных для удаления
        likeActive, // Флаг для отметки карточки, уже лайкнутой нашим пользователем

        // _handleCardClick - просмотр карточки
        (link, title) => {
            popupWithImage.open(link, title);
        },

        // _handleCardLike - простановка и снятие лайков
        () => {
            const cardLikeClassActive = card.likeIcon.classList.contains('card__like-icon_active');
            if (!cardLikeClassActive) {
                api.likeCard(cardId)
                    .then((result) => {
                        card.updateLikesCount(result);
                        // Переключаем цвет сердечка, если пришел удачный ответ от сервера
                        card.likeIcon.classList.toggle('card__like-icon_active');
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            else {
                api.deleteLikeCard(cardId)
                    .then((result) => {
                        card.updateLikesCount(result);
                        // Переключаем цвет сердечка, если пришел удачный ответ от сервера
                        card.likeIcon.classList.toggle('card__like-icon_active');
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },

        // _handleCardDelete - удаление карточки
        () => {
            popupDeleteCard.onPopupSubmit(() => {
                api.deleteCard(cardId) // удаляем карточку с сервера
                .then((res) => {
                    card.removeCard(); // удаляем карточку со страницы
                    popupDeleteCard.close();
                })
                .catch((err) => {
                    console.log(err);
                });
            });
            popupDeleteCard.open();
        }
    );
    return card.generate();
}

// Экземпляр класса Section - добавление карточек на страницу
const cardList = new Section({
    items: [],
    renderer: (item) => {
        // Проверяем по id пользователя, своя карточка или нет - возможно ли ее удаление пользователем
        const userInfo = profileUserInfo.getUserInfo();
        const canDelete = item.owner._id === userInfo.userId ? true : false;

        // Проверяем по id пользователя, лайкнувшего карточку, наш ли пользователь ее лайкнул
        const likeActive = item.likes.find(like => like._id === userInfo.userId);
        const card = createCard(item.link, item.name, item.likes.length, item._id, canDelete, likeActive);
        cardList.addItem(card);
    }
}, cardsSection);

// Обработчик сабмита формы добавления новой карточки
function handleAddCardFormSubmit(values) {

    // Меняем текст кнопки на Сохранение...
    popupAddCard.changeBtnText();

    // Отправляем новую карточку на сервер
    api.addCard(values.placeTitle, values.imageLink)
        .then((res) => {
            // Создаем и отрисовываем карточку на странице, флаг canDelete устанавливаем в true
            const card = createCard(res.link, res.name, res.likes.length, res._id, true, false);
            cardList.addItem(card);
            popupAddCard.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupAddCard.changeBackBtnText();
        });
}

// Слушатель клика по кнопке редактирования профиля
profileEditBtn.addEventListener('click', openPopupEditForm);

// Слушатель перехода мышки на аватарку пользователя
profileAvatarAria.addEventListener('mouseover', showAvatarEditIcon);

// Слушатель ухода мышки с аватарки пользователя
profileAvatarAria.addEventListener('mouseout', hideAvatarEditIcon);

// Слушатель клика по иконке редактирования аватарки
profileAvatarEditBtn.addEventListener('click', openPopupEditAvatar);

// Слушатель клика по кнопке добавления новой карточки
profileAddBtn.addEventListener('click', openPopupAddCard);