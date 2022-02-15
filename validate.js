// Валидация формы редактирования профиля

const formsValidationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    errorInputClass: 'popup__input_type_error',
    errorClass: 'popup__error_active',
    submitButtonSelector: '.popup__save-btn',
    submitButtonErrorClass: 'popup__save-btn_invalid'
}

// Находим все формы на странице и вешаем на каждую обработчики событий

function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach(formElement => setFormListeners(formElement, config));
}


function setFormListeners(formElement, config) {

    formElement.addEventListener('submit', handleSubmit);

    // устанавливаем статус кнопки submit
    setSubmitButtonState(formElement, config);

    formElement.addEventListener('input', () => setSubmitButtonState(formElement, config));

    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

    inputList.forEach(inputElement =>
        inputElement.addEventListener('input', () => {checkInputValidity(formElement, inputElement, config);
        setSubmitButtonState(formElement, config);
        }
    ));
}

function handleSubmit(evt) {
    evt.preventDefault();
}

function checkInputValidity(formElement, inputElement, config) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, config);
    }
    else {
        hideInputError(formElement, inputElement, config);
    }
}

// Показать сообщение об ошибке
function showInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(config.errorClass);
    inputElement.classList.add(config.errorInputClass);
    errorElement.textContent = inputElement.validationMessage;
}

// Скрыть сообщение об ошибке
function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.errorInputClass);
    errorElement.classList.remove(config.popup__error_active);
    errorElement.textContent = '';
}

// Установка статуса кнопки на основании валидации
function setSubmitButtonState(formElement, config) {
    const button = formElement.querySelector(config.submitButtonSelector);
    button.disabled = !formElement.checkValidity();
    button.classList.toggle(config.submitButtonErrorClass, !formElement.checkValidity());
}

