import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(link, name, popupSelector) {
        super(popupSelector);

        this._link = link;
        this._name = name;
        this._popup = document.querySelector(popupSelector);
        this._popupImg = this._popup.querySelector('.popup__image');
        this._popupCaption = this._popup.querySelector('.popup__header_type_view-pic')
    }

    open() {
        this._popupImg.src = this._link;
        this._popupImg.alt = this._name;
        this._popupCaption.textContent = this._name;
        super.open();
    }

}