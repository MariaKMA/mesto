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

export const cardTemplate = document.querySelector('#card').content;

export const popupTypeUser = document.querySelector('.popup_type_user');
export const popupTypePlace = document.querySelector('.popup_type_place');
export const popupViewPic = document.querySelector('.popup_type_view-pic');

export const popupTypeUserCloseBtn = document.querySelector('.popup__close-btn_type_user');
export const popupTypePlaceCloseBtn = document.querySelector('.popup__close-btn_type_place');
export const popupViewPicCloseBtn = popupViewPic.querySelector('.popup__close-btn_type_view-pic');
export const popupViewPicImg = document.querySelector('.popup__image');
export const popupViewPicCaption = document.querySelector('.popup__header_type_view-pic');

export const formElementTypeUser = document.querySelector('.popup__container_type_user');
export const formElementTypePlace = document.querySelector('.popup__container_type_place');

export const placeCaptionInput = formElementTypePlace.querySelector('.popup__place_type_title');
export const placeLinkInput = formElementTypePlace.querySelector('.popup__place_type_link');

// Переменные для редактирования профиля
export const profileEditBtn = document.querySelector('.profile__edit-btn');
export const profileUserName = document.querySelector('.profile__user-name');
export const profileUserInterest = document.querySelector('.profile__user-interest');
export const inputUserName = formElementTypeUser.querySelector('.popup__user_type_name');
export const inputUserInterest = formElementTypeUser.querySelector('.popup__user_type_interest');

// Переменные для добавление карточки
export const cardsSection = document.querySelector('.cards');
export const profileAddBtn = document.querySelector('.profile__add-btn');

export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    errorInputClass: 'popup__input_type_error',
    errorClass: 'popup__error_active',
    submitButtonSelector: '.popup__save-btn',
    submitButtonErrorClass: 'popup__save-btn_invalid'
}

export const forms = Array.from(document.querySelectorAll('.popup__form'));