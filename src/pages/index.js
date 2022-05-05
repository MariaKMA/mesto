import './index.css';

import {initialCards, formElementTypeUser, formElementTypePlace,
    profileEditBtn, inputUserName, inputUserInterest, cardsSection,
    profileAddBtn, config, userName, userInterest, profileAvatar
} from "../utils/constants.js";

import FormValidator from "../components/FormValidator";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";

// Экземпляр класса Api - для получения данных пользователя
const apiGetUserInfo = new Api('https://nomoreparties.co/v1/cohort-40/users/me', null);
apiGetUserInfo.getInfo()
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

    // отправляем обновленные данные на сервер
    const updateUserInfo = new Api('https://mesto.nomoreparties.co/v1/cohort-40/users/me', null);
    updateUserInfo.updateInfo(userData.userName, userData.userInterest);
    popupEditForm.close();
}

// Открываем попап добавления новой карточки
function openPopupAddCard() {
    popupAddCard.open();
    validatorPlaceForm.setSubmitButtonState(); // Деактивируем кнопку сабмита при открытии формы
}

// Функция создания карточки
function createCard(link, title, cardId) {
    const card = new Card(
        link,
        title,
        '.card-template',
        (link, title) => {
            const popupWithImage = new PopupWithImage(link, title, '.popup_type_view-pic');
            popupWithImage.open();
        },
        () => {
            const apiCardLike = new Api(`https://mesto.nomoreparties.co/v1/cohort-40/cards/${cardId}/likes`, null);
            const cardLikeClassActive = card._likeIcon.classList.contains('card__like-icon_active');
            if (!cardLikeClassActive) {
                apiCardLike.likeCard()
                    .then((result) => {
                        card.updateLikesCount(result);
                    })
                    // если запрос не ушел на сервер или сервер не ответил
                    .catch((err) => {
                        console.log(err);
                    });
            }
            else {
                apiCardLike.deleteLikeCard()
                    .then((result) => {
                        card.updateLikesCount(result);
                    })
                    // если запрос не ушел на сервер или сервер не ответил
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
    );
    return card.generate();
}

// Экземпляр класса Section - добавление карточек на страницу
const cardList = new Section({
    items: [],
    renderer: (item) => {
        const card = createCard(item.link, item.name, item._id);
        cardList.addItem(card);
    }
}, cardsSection);

// Экземпляр класса Api для получения первоначальных карточек
const apiGetInitialCards = new Api('https://mesto.nomoreparties.co/v1/cohort-40/cards', null);

// Отрисовываем на странице карточки, полученные с сервера
apiGetInitialCards.getInfo()
    .then((result) => {
        cardList.renderItems(result);
    })

    // если запрос не ушел на сервер или сервер не ответил
    .catch((err) => {
        console.log(err);
    });


// Обработчик сабмита формы добавления новой карточки
function handleAddCardFormSubmit(values) {

    // Отправляем новую карточку на сервер
    const addNewCard = new Api('https://mesto.nomoreparties.co/v1/cohort-40/cards', null);
    addNewCard.addCard(values.placeTitle, values.imageLink)
        .then((res) => {
            // Создаем и отрисовываем карточку на странице
            const card = createCard(res.link, res.name, res._id);
            cardList.addItem(card);
        })
        // если запрос не ушел на сервер или сервер не ответил
        .catch((err) => {
            console.log(err);
        });

    popupAddCard.close();
}

// Слушатель клика по кнопке редактирования профиля
profileEditBtn.addEventListener('click', openPopupEditForm);

// Слушатель клика по кнопке добавления новой карточки
profileAddBtn.addEventListener('click', openPopupAddCard);