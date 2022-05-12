import './index.css';

import {formElementTypeUser, formElementTypePlace,
    profileEditBtn, inputUserName, inputUserInterest, cardsSection,
    profileAddBtn, config, userName, userInterest, profileAvatar,
    profileAvatarAria, profileAvatarEditBtn, ownerId
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

// Получаем с сервера и выводим на страницу данные пользователя
api.getUserInfo()
    .then((result) => {
        userName.textContent = result.name;
        userInterest.textContent = result.about;
        profileAvatar.src = result.avatar;
    })
    // если запрос не ушел на сервер или сервер не ответил
    .catch((err) => {
        console.log(err);
    });


// Экземпляр класса PopupWithForm - для формы редактирования профиля
const popupEditForm = new PopupWithForm('.popup_type_user', handleProfileFormSubmit);
popupEditForm.setEventListeners();

// Экземпляр класса PopupWuthForm - для формы редактирования аватара
const popipEditAvatar = new PopupWithForm('.popup_type_avatar', handleEditAvatarSubmit);
popipEditAvatar.setEventListeners();

// Экземпляр класса PopupWithForm - для формы добавления новой карточки
const popupAddCard = new PopupWithForm('.popup_type_place', handleAddCardFormSubmit);
popupAddCard.setEventListeners();

// Экземпляр класса PopupWithDeleteCard - для удаления карточки
const popupDeleteCard = new PopupWithDeleteCard('.popup_type_delete-card');
popupDeleteCard.setEventListeners();

// Редактирование аватарки: отправляем на сервер новую ссылку и отрисовываем
function handleEditAvatarSubmit(values) {
    const link = values.avatarLink;
    api.editAvatar(link)
        .then((res) => {
            profileAvatar.src = res.avatar;
        })
        .catch((err) => {
            console.log(err);
        });
    popipEditAvatar.close();
}

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
    // отправляем обновленные данные на сервер
    api.updateUserInfo(userData.userName, userData.userInterest)
        .catch((err) => {
            console.log(err);
        });

    profileUserInfo.setUserInfo(userData); // данные из инпутов записываем на страницу в профиль пользователя
    popupEditForm.close();
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
    popipEditAvatar.open();
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
            const popupWithImage = new PopupWithImage('.popup_type_view-pic');
            popupWithImage.setEventListeners();
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
        const canDelete = item.owner._id === ownerId ? true : false;
        // Проверяем по id пользователя, лайкнувшего карточку, наш ли пользователь ее лайкнул
        const likeActive = item.likes.find(like => like._id === ownerId);
        const card = createCard(item.link, item.name, item.likes.length, item._id, canDelete, likeActive);
        cardList.addItem(card);
    }
}, cardsSection);

// Отрисовываем на странице карточки, полученные с сервера
api.getInitialCards()
    .then((result) => {
        cardList.renderItems(result);
    })
    .catch((err) => {
        console.log(err);
    });


// Обработчик сабмита формы добавления новой карточки
function handleAddCardFormSubmit(values) {

    // Отправляем новую карточку на сервер
    api.addCard(values.placeTitle, values.imageLink)
        .then((res) => {
            // Создаем и отрисовываем карточку на странице, флаг canDelete устанавливаем в true
            const card = createCard(res.link, res.name, res.likes.length, res._id, true, false);
            cardList.addItem(card);
        })
        .catch((err) => {
            console.log(err);
        });

    popupAddCard.close();
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