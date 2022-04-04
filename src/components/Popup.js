export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupCloseBtn = this._popup.querySelector('.popup__close-btn');
    }

    open() {
        this._popup.classList.add('popup_active');
        document.addEventListener('keydown', (evt) => {this._handleEscClose(evt)});
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_active')) {this.close()}});

    }

    close() {
        this._popup.classList.remove('popup_active');
        document.removeEventListener('keydown', (evt) => {this._handleEscClose()});
        this._popup.removeEventListener('click', () => {this.close()});

    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popupCloseBtn.addEventListener('click', () => {this.close()});
    }
}