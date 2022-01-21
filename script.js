let popupEditBtn = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let profileUserName = document.querySelector('.profile__user-name');
let profileUserInterest = document.querySelector('.profile__user-interest');
let popupCloseBtn = document.querySelector('.popup__close-btn');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__user_type_name');
let jobInput = formElement.querySelector('.popup__user_type_interest');

const cardsSection = document.querySelector('.cards');

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

popupEditBtn.addEventListener('click', openPopup);

function openPopup() {
    popup.classList.add('popup_active');
    nameInput.value = profileUserName.textContent;
    jobInput.value = profileUserInterest.textContent;
}

// Закрыть попап

popupCloseBtn.addEventListener('click', closePopup);

function closePopup() {
    popup.classList.remove('popup_active');
}


// Редактирование профиля и отправка формы

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileUserName.textContent = nameInput.value;
    profileUserInterest.textContent = jobInput.value;

    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);


// Вывод карточек на страницу

initialCards.forEach(item => {
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__img').src = item.link;
    cardElement.querySelector('.card__caption').textContent = item.name;
    cardsSection.append(cardElement);
    }
)