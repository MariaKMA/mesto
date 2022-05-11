export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const formElementTypeUser = document.querySelector('.popup__container_type_user');
export const formElementTypePlace = document.querySelector('.popup__container_type_place');

// Переменные для редактирования профиля
export const profileEditBtn = document.querySelector('.profile__edit-btn');
export const inputUserName = formElementTypeUser.querySelector('.popup__user_type_name');
export const inputUserInterest = formElementTypeUser.querySelector('.popup__user_type_interest');

// Переменные для добавление карточки
export const cardsSection = document.querySelector('.cards');
export const profileAddBtn = document.querySelector('.profile__add-btn');

export const userName = document.querySelector('.profile__user-name');
export const userInterest = document.querySelector('.profile__user-interest');
export const profileAvatar = document.querySelector('.profile__avatar');
export const profileAvatarAria = document.querySelector('.profile__avatar-aria');
export const profileAvatarEditBtn = document.querySelector('.profile__avatar-edit-btn');

export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    errorInputClass: 'popup__input_type_error',
    errorClass: 'popup__error_active',
    submitButtonSelector: '.popup__save-btn',
    submitButtonErrorClass: 'popup__save-btn_invalid'
};

export const ownerId = 'ead37e227a5255f9ff26c281';