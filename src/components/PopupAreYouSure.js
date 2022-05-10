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
        console.log('из setEventListeners PopupAreYouSure');
        this._btnElement.addEventListener('click', () => {
            console.log('из addEventListener submit PopupAreYouSure');
            this._handleFormSubmit();
        });
    }
}