export default class Card {

    // constructor(link, name, cardSelector, handleCardClick, handleCardLike, handleCardDelete) {
    constructor(link, name, cardSelector, canDelete, handleCardClick, handleCardLike, handleCardDelete) {

        this._link = link;
        this._name = name;
        this._cardSelector = cardSelector;
        this._canDelete = canDelete;
        this._handleCardClick = handleCardClick;
        this._handleCardLike = handleCardLike;
        this._handleCardDelete = handleCardDelete;
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
        this.likeIcon = this._card.querySelector('.card__like-icon');
        this._trashIcon = this._card.querySelector('.card__trash-icon');
        this._cardCaption = this._card.querySelector('.card__caption');
        this._likesCounter = this._card.querySelector('.card__likes-counter');

        // Если передан флаг, что карточку нельзя удалять, то убираем иконку корзины
        if (!this._canDelete) {
            this._trashIcon.style.display = 'none';
        }

        this._setEventListeners();

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardCaption.textContent = this._name;
        return this._card;
    }

    _setEventListeners() {

        // Лайкнуть карточку
        this.likeIcon.addEventListener('click', () => {
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

    updateLikesCount(data) {
        this._likesCounter.textContent = data.likes.length; // отрисовываем количество лайков
    }

    _likeIconClick() {
        this._handleCardLike();
        this.likeIcon.classList.toggle('card__like-icon_active');
    }

    _deleteCardClick() {
        this._handleCardDelete();
        // this._card.remove();
        // this._card = null;
    }

    removeCard() {
        this._card.remove();
        this._card = null;
    }
}