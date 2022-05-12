export default class Card {

    constructor(link, name, likes, cardSelector, canDelete, likeActive, handleCardClick, handleCardLike, handleCardDelete) {

        this._link = link;
        this._name = name;
        this._likes = likes;
        this._cardSelector = cardSelector;
        this._canDelete = canDelete;
        this._likeActive = likeActive;
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

        if (this._likeActive) {
            this.likeIcon.classList.add('card__like-icon_active');
        }

        this._setEventListeners();

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardCaption.textContent = this._name;
        this._likesCounter.textContent = this._likes;
        return this._card;
    }

    _setEventListeners() {

        // Лайкнуть карточку
        this.likeIcon.addEventListener('click', () => {
            this._handleCardLike();
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

    _deleteCardClick() {
        this._handleCardDelete();
    }

    removeCard() {
        this._card.remove();
        this._card = null;
    }
}