import Popup from './Popup.js';

export default class PopupWithDeleteCard extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._popupSubmitBtn = this._popup.querySelector('.popup__save-btn');
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupSubmitBtn.addEventListener('click', () => {
            this._handleDeleteCardSubmit();
        });
    }

    onPopupSubmit(handleDeleteCardSubmit) {
        this._handleDeleteCardSubmit = handleDeleteCardSubmit;
    }
}