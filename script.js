let popupEditBtn = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let profileUserName = document.querySelector('.profile__user-name');
let profileUserInterest = document.querySelector('.profile__user-interest');
let popupCloseBtn = document.querySelector('.popup__close-btn');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__user_type_name');
let jobInput = formElement.querySelector('.popup__user_type_interest');

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