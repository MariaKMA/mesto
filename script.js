const popupTypeUser = document.querySelector('.popup_type_user');
const popupTypePlace = document.querySelector('.popup_type_place');
const popupTypeUserCloseBtn = document.querySelector('.popup__close-btn_type_user');
const popupTypePlaceCloseBtn = document.querySelector('.popup__close-btn_type_place');
const formElementTypeUser = document.querySelector('.popup__container_type_user');
const formElementTypePlace = document.querySelector('.popup__container_type_place');

// Переменные для редактирования профиля
const popupEditBtn = document.querySelector('.profile__edit-btn');
let profileUserName = document.querySelector('.profile__user-name');
let profileUserInterest = document.querySelector('.profile__user-interest');
let nameInput = formElementTypeUser.querySelector('.popup__user_type_name');
let jobInput = formElementTypeUser.querySelector('.popup__user_type_interest');

// Переменные для добавление карточки
const cardsSection = document.querySelector('.cards');
const popupAddBtn = document.querySelector('.profile__add-btn');
let placeCaptionInput = formElementTypePlace.querySelector('.popup__place_type_title');
let placeLinkInput = formElementTypePlace.querySelector('.popup__place_type_link');

const initialCards = [
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


// Открыть попап редактирования пользователя

popupEditBtn.addEventListener('click', openPopupEditForm);

function openPopupEditForm() {
    popupTypeUser.classList.add('popup_active');
    nameInput.value = profileUserName.textContent;
    jobInput.value = profileUserInterest.textContent;
}

// Закрыть попап редактирования профиля

popupTypeUserCloseBtn.addEventListener('click', closePopupEditForm);

function closePopupEditForm() {
    popupTypeUser.classList.remove('popup_active');
}


// Редактировать профиль и отправить форму

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileUserName.textContent = nameInput.value;
    profileUserInterest.textContent = jobInput.value;

    closePopupEditForm();
}

formElementTypeUser.addEventListener('submit', formSubmitHandler);


// Вывод карточек на страницу

initialCards.forEach(item => {
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__img').src = item.link;
    cardElement.querySelector('.card__img').alt = item.name;
    cardElement.querySelector('.card__caption').textContent = item.name;
    cardsSection.append(cardElement);

    // навесить новой карточке события клика по иконке like и иконке trash
    likeCard(cardElement);
    deleteCard(cardElement);
    }
)

// Открыть попап добавления новой карточки

popupAddBtn.addEventListener('click', openPopupAddPlace);

function openPopupAddPlace() {
    popupTypePlace.classList.add('popup_active');
    placeCaptionInput.value = '';
    placeLinkInput.value = '';
}


// Закрыть попап добавления новой карточки

popupTypePlaceCloseBtn.addEventListener('click', closePopupAddPlace);

function closePopupAddPlace() {
    popupTypePlace.classList.remove('popup_active');
}


// Добавление карточки и закрытие попапа

function addCardHandler (evt) {
    evt.preventDefault();
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__img').src = placeLinkInput.value;
    cardElement.querySelector('.card__img').alt = placeCaptionInput.value;
    cardElement.querySelector('.card__caption').textContent = placeCaptionInput.value;
    cardsSection.prepend(cardElement);

    closePopupAddPlace();

    // навесить новой карточке события клика по иконке like и иконке trash
    likeCard(cardElement);
    deleteCard(cardElement);
}

formElementTypePlace.addEventListener('submit', addCardHandler);

// Лайкнуть картинку

function likeCard(cardElement) {
    const likeIcon = cardElement.querySelector('.card__like-icon');
    likeIcon.addEventListener('click', () => likeIcon.classList.toggle('card__like-icon_active'));
}

// Удалить картинку

function deleteCard(cardElement) {
    const trashIcon = cardElement.querySelector('.card__trash-icon');
    trashIcon.addEventListener('click', () => trashIcon.closest('.card').remove());
}

// Просмотр картинки - открыть попап

const cards = document.querySelectorAll('.card');
const popupViewPic = document.querySelector('.popup_type_view-pic');
const popupImg = document.querySelector('.popup__image');
const popupHeaderViewPic = document.querySelector('.popup__header_type_view-pic');
const cardHeaders = document.querySelectorAll('.card__caption');

// Навесить событие просмотра картинки по клику

cards.forEach(function(item) {
    const image = item.querySelector('.card__img');
    image.addEventListener('click', () => {
        popupViewPic.classList.add('popup_active');
        popupImg.src = image.src;
        popupImg.alt = image.alt;
        popupHeaderViewPic.textContent = item.querySelector('.card__caption').textContent;
    });
})

// Закрыть попап с картинкой

const popupViewPicCloseBtn = popupViewPic.querySelector('.popup__close-btn_type_view-pic');
popupViewPicCloseBtn.addEventListener('click', () => {
    popupViewPic.classList.remove('popup_active');
})
