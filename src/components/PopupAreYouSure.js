import Popup from './Popup.js';

export default class PopupAreYouSure extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._btnElement = this._popup.querySelector('.popup__container');
        this._handleFormSubmit = handleFormSubmit;
    }

    setEventListeners() {
        super.setEventListeners();
        this._btnElement.addEventListener('click', () => {
            this._handleFormSubmit();
        });
    }
}