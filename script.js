// Открыть попап

let popup_edit_btn = document.querySelector('.profile__edit-btn');
popup_edit_btn.addEventListener('click', openPopup);

function openPopup() {
    let popup = document.querySelector('.popup');
    popup.classList.add('popup_active');

    let profile_user_name = document.querySelector('.profile__user-name');
    let popup_user_name = document.querySelector('.popup__user-name');

    popup_user_name.value = profile_user_name.textContent;

    let profile_user_interest = document.querySelector('.profile__user-interest');
    let popup_user_interest = document.querySelector('.popup__user-interest');

    popup_user_interest.value = profile_user_interest.textContent;
}


// Закрыть попап

let popup_close_btn = document.querySelector('.popup__close-btn');
popup_close_btn.addEventListener('click', closePopup);

function closePopup() {
    let popup = document.querySelector('.popup');
    popup.classList.remove('popup_active');
}


// Редактирование профиля и отправка формы

let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__user-name');
let jobInput = formElement.querySelector('.popup__user-interest');

function formSubmitHandler (evt) {
    evt.preventDefault();

    let profile_user_name = document.querySelector('.profile__user-name');
    let profile_user_interest = document.querySelector('.profile__user-interest');

    profile_user_name.textContent = nameInput.value;
    profile_user_interest.textContent = jobInput.value;

    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);