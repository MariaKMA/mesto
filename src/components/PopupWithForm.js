import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);

        this._popup = document.querySelector(popupSelector);
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._formElement = this._popup.querySelector('.popup__container');
        this._submitBtn = this._popup.querySelector('.popup__save-btn');
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach(inputElement => {
            this._inputValues[inputElement.name] = inputElement.value;
        });

        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitBtn.textContent = 'Сохранение...';
            this._handleFormSubmit(this._getInputValues()); // обработчик сабмита принимает объект с содержимым инпутов формы
        });
    }



    close() {
        super.close();
        this._formElement.reset();
    }
}