import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    // constructor(link, name, popupSelector) {
    constructor(popupSelector) {

        super(popupSelector);

        // this._link = link;
        // this._name = name;
        // this._popup = document.querySelector(popupSelector);
        this._popupImg = this._popup.querySelector('.popup__image');
        this._popupCaption = this._popup.querySelector('.popup__header_type_view-pic')
    }

    open(link, name) {
        this._popupImg.src = link ;
        this._popupImg.alt = name;
        this._popupCaption.textContent = name;
        super.open();
    }

}