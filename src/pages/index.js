import './index.css';

import {formElementTypeUser, formElementTypePlace,
    profileEditBtn, inputUserName, inputUserInterest, cardsSection,
    profileAddBtn, config, userName, userInterest, profileAvatar,
    profileAvatarAria, profileAvatarEditBtn
} from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupAreYouSure from '../components/PopupAreYouSure.js'


// Экземпляр класса Api - для получения данных пользователя
const apiGetUserInfo = new Api('https://nomoreparties.co/v1/cohort-40/users/me', {
        'authorization': 'f09c6838-ffad-47d4-ac9e-28f932775532'
    }
);
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

// Экземпляр класса PopupWuthFOrm - для формы редактирования аватара
const popipEditAvatar = new PopupWithForm('.popup_type_avatar', handleEditAvatarSubmit);
popipEditAvatar.setEventListeners();

// Отправляем на сервер новую ссылку для аватара и отрисовываем новый аватар
function handleEditAvatarSubmit(values) {
    const link = values.avatarLink;
    const avatar = new Api(`https://mesto.nomoreparties.co/v1/cohort-40/users/me/avatar`, {
            'authorization': 'f09c6838-ffad-47d4-ac9e-28f932775532',
            'Content-Type': 'application/json'
        }
    );
    avatar.editAvatar(link)
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
    const updateUserInfo = new Api('https://mesto.nomoreparties.co/v1/cohort-40/users/me', {
            authorization: 'f09c6838-ffad-47d4-ac9e-28f932775532',
            'Content-Type': 'application/json'
        }
    );
    updateUserInfo.updateInfo(userData.userName, userData.userInterest)
        .catch((err) => {
            console.log(err);
        });

    profileUserInfo.setUserInfo(userData); // данные из инпутов записываем на страницу в профиль пользователя
    popupEditForm.close();
}

// Открываем попап добавления новой карточки
function openPopupAddCard() {
    popupAddCard.open();
    validatorPlaceForm.setSubmitButtonState(); // Деактивируем кнопку сабмита при открытии формы
}

// Функция создания карточки
function createCard(link, title, cardId, canDelete) {
    const card = new Card(
        link,
        title,
        '.card-template',
        canDelete,

        // _handleCardClick - просмотр карточки
        (link, title) => {
            const popupWithImage = new PopupWithImage(link, title, '.popup_type_view-pic');
            popupWithImage.setEventListeners();
            popupWithImage.open();
        },

        // _handleCardLike - простановка и снятие лайков
        () => {
            const apiCardLike = new Api(`https://mesto.nomoreparties.co/v1/cohort-40/cards/${cardId}/likes`, {
                    'authorization': 'f09c6838-ffad-47d4-ac9e-28f932775532'
                }
            );
            const cardLikeClassActive = card.likeIcon.classList.contains('card__like-icon_active');
            if (!cardLikeClassActive) {
                apiCardLike.likeCard()
                    .then((result) => {
                        card.updateLikesCount(result);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            else {
                apiCardLike.deleteLikeCard()
                    .then((result) => {
                        card.updateLikesCount(result);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },

        // _handleCardDelete - удаление карточки
        () => {
            // Экземпляр класса PopupWithForm - для удаления карточки
            const popupDeleteCard = new PopupAreYouSure('.popup_type_delete-card', handleCardDeleteFormSubmit);
            function handleCardDeleteFormSubmit() {
                const apiCardDelete = new Api(`https://mesto.nomoreparties.co/v1/cohort-40/cards/${cardId}`, {
                        'authorization': 'f09c6838-ffad-47d4-ac9e-28f932775532'
                    }
                )
                apiCardDelete.deleteCard() // удаляем карточку с сервера
                .catch((err) => {
                    console.log(err);
                });
                card.removeCard(); // удаляем карточку со страницы
                popupDeleteCard.close();
            }
            popupDeleteCard.setEventListeners();
            popupDeleteCard.open();

        }
    );
    return card.generate();
}

// Экземпляр класса Section - добавление карточек на страницу
const cardList = new Section({
    items: [],
    renderer: (item) => {
        const card = createCard(item.link, item.name, item._id, false);
        cardList.addItem(card);
    }
}, cardsSection);

// Экземпляр класса Api для получения первоначальных карточек
const apiGetInitialCards = new Api('https://mesto.nomoreparties.co/v1/cohort-40/cards', {
    'authorization': 'f09c6838-ffad-47d4-ac9e-28f932775532'
    }
);

// Отрисовываем на странице карточки, полученные с сервера
apiGetInitialCards.getInfo()
    .then((result) => {
        cardList.renderItems(result);
    })
    .catch((err) => {
        console.log(err);
    });


// Обработчик сабмита формы добавления новой карточки
function handleAddCardFormSubmit(values) {

    // Отправляем новую карточку на сервер
    const addNewCard = new Api('https://mesto.nomoreparties.co/v1/cohort-40/cards', {
            authorization: 'f09c6838-ffad-47d4-ac9e-28f932775532',
            'Content-Type': 'application/json'
        }
    );
    addNewCard.addCard(values.placeTitle, values.imageLink)
        .then((res) => {
            // Создаем и отрисовываем карточку на странице
            const card = createCard(res.link, res.name, res._id, true);
            cardList.addItem(card);
        })
        .catch((err) => {
            console.log(err);
        });

    popupAddCard.close();
}

// Слушатель клика по кнопке редактирования профиля
profileEditBtn.addEventListener('click', openPopupEditForm);

// Слушатель клика по кнопке добавления новой карточки
profileAddBtn.addEventListener('click', openPopupAddCard);

// Слушатель перехода мышки на аватарку пользователя
profileAvatarAria.addEventListener('mouseover', showAvatarEditIcon);

function showAvatarEditIcon(evt) {
    evt.target.style.opacity = '0.8';
    evt.target.style.backgroundColor = 'black';
    profileAvatarEditBtn.style.visibility = 'visible';

}

// Слушатель ухода мышки с аватарки пользователя
profileAvatarAria.addEventListener('mouseout', hideAvatarEditIcon);

function hideAvatarEditIcon(evt) {
    evt.target.style.opacity = '1';
    profileAvatarEditBtn.style.visibility = 'hidden';

}

// Слушатель клика по иконке редактирования аватарки
profileAvatarEditBtn.addEventListener('click', openPopupEditAvatar);

function openPopupEditAvatar() {
    popipEditAvatar.open();
}