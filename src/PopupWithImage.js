import Popup from './Popup.js';
import {popupViewPicImg, popupViewPicCaption} from './data.js';

export default class PopupWithImage extends Popup {
    constructor(link, name, popupSelector) {
        super(popupSelector);

        this._link = link;
        this._name = name;
    }

    open() {
        popupViewPicImg.src = this._link;
        popupViewPicImg.alt = this._name;
        popupViewPicCaption.textContent = this._name;
        super.open();
    }

}