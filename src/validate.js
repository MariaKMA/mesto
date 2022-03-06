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

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.classList.add(this._config.errorClass);
        inputElement.classList.add(this._config.errorInputClass);
        errorElement.textContent = errorMessage;
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

    disableAddCardSubmit() {
        const button = this._formElement.querySelector('.popup__save-btn');
        button.disabled = true;
        button.classList.add('popup__save-btn_invalid');
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        }
        else {
            this._hideInputError(inputElement);
        }
    }

    _setFormListeners() {

        this._formElement.addEventListener('submit', this._handleSubmit);

        this._inputs.forEach(inputElement =>
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._setSubmitButtonState();
            })
        );
    }

    enableValidation() {
        this._setFormListeners();
    }
}