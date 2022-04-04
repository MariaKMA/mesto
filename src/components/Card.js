export default class Card {

    constructor(link, name, cardSelector, handleCardClick) {
        this._link = link;
        this._name = name;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
        this._cardImage = this._card.querySelector('.card__img');
        this._likeIcon = this._card.querySelector('.card__like-icon');
        this._trashIcon = this._card.querySelector('.card__trash-icon');
        this._cardCaption = this._card.querySelector('.card__caption');

        this._setEventListeners();

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardCaption.textContent = this._name;

        return this._card;
    }

    _setEventListeners() {

        // Лайкнуть карточку
        this._likeIcon.addEventListener('click', () => {
          this._likeIconClick();
        });

        // Удалить карточку
        this._trashIcon.addEventListener('click', () => {
           this._deleteCardClick();
        })

        // Посмотреть картинку
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._link, this._name);
        })
    }

    _likeIconClick() {
        this._likeIcon.classList.toggle('card__like-icon_active');
    }

    _deleteCardClick() {
        this._card.remove();
        this._card = null;
    }
}