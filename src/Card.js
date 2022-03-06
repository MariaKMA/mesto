import {openPopup} from "./openPopup.js";
import {popupViewPic, popupViewPicImg, popupViewPicCaption} from "./data.js";

export default class Card {

    constructor(link, name, cardSelector) {
        this._link = link;
        this._name = name;
        this._cardSelector = cardSelector;
        // this._onView = onView;
    }

    _getTemplate() {
        const cardElement = document
          .querySelector(this._cardSelector)
          .content
          .querySelector('.card')
          .cloneNode(true);

        return cardElement;
    }

    generate() {
        this._card = this._getTemplate();
        this._setEventListeners();

        this._card.querySelector('.card__img').src = this._link;
        this._card.querySelector('.card__img').alt = this._name;
        this._card.querySelector('.card__caption').textContent = this._name;

        return this._card;
    }

    _setEventListeners() {

        // Лайкнуть карточку
        this._card.querySelector('.card__like-icon').addEventListener('click', () => {
          this._likeIconClick();
        });

        // Удалить карточку
        this._card.querySelector('.card__trash-icon').addEventListener('click', () => {
           this._deleteCardClick();
        })

        // Посмотреть картинку
        this._card.querySelector('.card__img').addEventListener('click', () => {
            this._viewPicture();
        })
    }

    _likeIconClick() {
        this._card.querySelector('.card__like-icon').classList.toggle('card__like-icon_active');
    }

    _deleteCardClick() {
        this._card.querySelector('.card__trash-icon').closest('.card').remove();
    }

    _viewPicture() {
        openPopup(popupViewPic);
        popupViewPicImg.src = this._card.querySelector('.card__img').src;
        popupViewPicImg.alt = this._card.querySelector('.card__img').alt;
        popupViewPicCaption.textContent = this._card.querySelector('.card__caption').textContent;
    }
}