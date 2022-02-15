const cardTemplate = document.querySelector('#card').content;

const popupTypeUser = document.querySelector('.popup_type_user');
const popupTypePlace = document.querySelector('.popup_type_place');
const popupViewPic = document.querySelector('.popup_type_view-pic');

const popupTypeUserCloseBtn = document.querySelector('.popup__close-btn_type_user');
const popupTypePlaceCloseBtn = document.querySelector('.popup__close-btn_type_place');
const popupViewPicCloseBtn = popupViewPic.querySelector('.popup__close-btn_type_view-pic');
const popupViewPicImg = document.querySelector('.popup__image');
const popupViewPicCaption = document.querySelector('.popup__header_type_view-pic');

const formElementTypeUser = document.querySelector('.popup__container_type_user');
const formElementTypePlace = document.querySelector('.popup__container_type_place');

const placeCaptionInput = formElementTypePlace.querySelector('.popup__place_type_title');
const placeLinkInput = formElementTypePlace.querySelector('.popup__place_type_link');

// Переменные для редактирования профиля
const profileEditBtn = document.querySelector('.profile__edit-btn');
const profileUserName = document.querySelector('.profile__user-name');
const profileUserInterest = document.querySelector('.profile__user-interest');
const inputUserName = formElementTypeUser.querySelector('.popup__user_type_name');
const inputUserInterest = formElementTypeUser.querySelector('.popup__user_type_interest');

// Переменные для добавление карточки
const cardsSection = document.querySelector('.cards');
const profileAddBtn = document.querySelector('.profile__add-btn');
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

// Открыть попап

function openPopup(popup) {
    popup.classList.add('popup_active');
    document.addEventListener('keydown', closePopupEsc);
}

// Закрыть попап

function closePopup(popup) {
    popup.classList.remove('popup_active');
    document.removeEventListener('keydown', closePopupEsc);
}

// Закрыть попап по нажатию на esc

function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_active');
        closePopup(popup);
    }
}

// Закрыть попап по нажатию на overlay

function closePopupOverlay(evt) {
    if (evt.target.classList.contains('popup_active')) {
        closePopup(evt.target);
    }
}

// Обработчики событий - закрыть попап нажатием на темный фон

document.addEventListener('click', closePopupOverlay);


// Открыть и провалидировать попап редактирования пользователя

profileEditBtn.addEventListener('click', openPopupEditForm);

function openPopupEditForm() {
    openPopup(popupTypeUser);
    inputUserName.value = profileUserName.textContent;
    inputUserInterest.value = profileUserInterest.textContent;
    enableValidation(formsValidationConfig);
}


// Закрыть попап редактирования пользователя при нажатии на крестик

popupTypeUserCloseBtn.addEventListener('click', () => {closePopup(popupTypeUser)});


// Редактировать профиль и отправить форму

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileUserName.textContent = inputUserName.value;
    profileUserInterest.textContent = inputUserInterest.value;
    closePopup(popupTypeUser);
}

formElementTypeUser.addEventListener('submit', handleProfileFormSubmit);


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

// Посмотреть картинку

function viewPicture(cardElement, cardImage) {
    const cardCaption = cardElement.querySelector('.card__caption');
    cardImage.addEventListener('click', () => {
        openPopup(popupViewPic);
        popupViewPicImg.src = cardImage.src;
        popupViewPicImg.alt = cardImage.alt;
        popupViewPicCaption.textContent = cardCaption.textContent;
    });
}


// Создать карточку

function createCard(link, name) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__img');
    cardImage.src = link;
    cardImage.alt = name;
    cardElement.querySelector('.card__caption').textContent = name;

    // обработчики событий клика по иконке like, иконке trash и самой карточке
    likeCard(cardElement);
    deleteCard(cardElement);
    viewPicture(cardElement, cardImage);

    return cardElement;
}


// Вывести карточки на страницу по данным из массива

initialCards.forEach(item => {
    const card = createCard(item.link, item.name);
    cardsSection.append(card);
})


// Открыть попап добавления новой карточки и провалидировать форму

profileAddBtn.addEventListener('click', openPopupAddCard);

function openPopupAddCard() {
    openPopup(popupTypePlace);
    formElementTypePlace.querySelector('.popup__place_type_title').value = '';
    formElementTypePlace.querySelector('.popup__place_type_link').value = '';
    enableValidation(formsValidationConfig);
}


// Закрыть попап добавления новой карточки

popupTypePlaceCloseBtn.addEventListener('click', () => {closePopup(popupTypePlace);});


//  Добавить на страницу новую карточку

function handleAddFormSubmit(evt) {
    evt.preventDefault();

    const card = createCard(placeLinkInput.value, placeCaptionInput.value);

    cardsSection.prepend(card);

    placeCaptionInput.value = '';
    placeLinkInput.value = '';

    closePopup(popupTypePlace);
}

formElementTypePlace.addEventListener('submit', handleAddFormSubmit);


// Закрыть попап с картинкой

popupViewPicCloseBtn.addEventListener('click', () => {closePopup(popupViewPic)});