// Валидация формы редактирования профиля

class FormValidator {
    constructor(data, formElement) {
        this._formElement = formElement;
        this._config = data;
        this._inputs = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._button = this._formElement.querySelector(this._config.submitButtonSelector);
    }

    _handleSubmit(evt) {
        evt.preventDefault();
    }

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.classList.add(this._config.errorClass);
        inputElement.classList.add(this._config.errorInputClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.errorInputClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
    }

    _setSubmitButtonState() {
        this._button.disabled = !this._formElement.checkValidity();
        this._button.classList.toggle(this._config.submitButtonErrorClass, !this._formElement.checkValidity());
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        }
        else {
            this._hideInputError(inputElement);
        }
    }

    _setFormListeners() {

        this._formElement.addEventListener('submit', this._handleSubmit);

        // установить статус кнопки submit
        // this._setSubmitButtonState();

        this._inputs.forEach(inputElement =>
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._setSubmitButtonState();
            }
        ));
    }

    enableValidation() {
        // const forms = Array.from(document.querySelectorAll(this._config.formSelector));

        this._setFormListeners();
    }

}

// Находим все формы на странице и вешаем на каждую обработчики событий

// function enableValidation(config) {
//     const forms = Array.from(document.querySelectorAll(config.formSelector));

//     forms.forEach(formElement => setFormListeners(formElement, config));
// }


// Установить статус кнопки на основании валидации
// function setSubmitButtonState(formElement, config) {
//     const button = formElement.querySelector(config.submitButtonSelector);
//     button.disabled = !formElement.checkValidity();
//     button.classList.toggle(config.submitButtonErrorClass, !formElement.checkValidity());
// }


// Повесить события на форму и элементы формы

// function setFormListeners(formElement, config) {

//     formElement.addEventListener('submit', handleSubmit);

//     // установить статус кнопки submit
//     setSubmitButtonState(formElement, config);

//     const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));

//     inputs.forEach(inputElement =>
//         inputElement.addEventListener('input', () => {checkInputValidity(formElement, inputElement, config);
//         setSubmitButtonState(formElement, config);
//         }
//     ));
// }

// function handleSubmit(evt) {
//     evt.preventDefault();
// }


// Показать сообщение об ошибке
// function showInputError(formElement, inputElement, config) {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     errorElement.classList.add(config.errorClass);
//     inputElement.classList.add(config.errorInputClass);
//     errorElement.textContent = inputElement.validationMessage;
// }

// Скрыть сообщение об ошибке
// function hideInputError(formElement, inputElement, config) {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.remove(config.errorInputClass);
//     errorElement.classList.remove(config.popup__error_active);
//     errorElement.textContent = '';
// }


// Функция валидации, управляющая показом/скрытием ошибки

// function checkInputValidity(formElement, inputElement, config) {
//     if (!inputElement.validity.valid) {
//         showInputError(formElement, inputElement, config);
//     }
//     else {
//         hideInputError(formElement, inputElement, config);
//     }
// }

// enableValidation(formsValidationConfig);
