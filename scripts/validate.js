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
    const forms = Array.from(document.querySelectorAll(config.formSelector));

    forms.forEach(formElement => setFormListeners(formElement, config));
}


// Установить статус кнопки на основании валидации
function setSubmitButtonState(formElement, config) {
    const button = formElement.querySelector(config.submitButtonSelector);
    button.disabled = !formElement.checkValidity();
    button.classList.toggle(config.submitButtonErrorClass, !formElement.checkValidity());
}


// Повесить события на форму и элементы формы

function setFormListeners(formElement, config) {

    formElement.addEventListener('submit', handleSubmit);

    // установить статус кнопки submit
    setSubmitButtonState(formElement, config);

    const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));

    inputs.forEach(inputElement =>
        inputElement.addEventListener('input', () => {checkInputValidity(formElement, inputElement, config);
        setSubmitButtonState(formElement, config);
        }
    ));
}

function handleSubmit(evt) {
    evt.preventDefault();
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


// Функция валидации, управляющая показом/скрытием ошибки

function checkInputValidity(formElement, inputElement, config) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, config);
    }
    else {
        hideInputError(formElement, inputElement, config);
    }
}