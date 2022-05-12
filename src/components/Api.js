export default class Api {
    constructor(baseUrl, headers) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    // Получение данных пользователя с сервера
    getUserInfo() {
        return fetch('https://nomoreparties.co/v1/cohort-40/users/me', {
            method: 'GET',
            headers: {
                'authorization': 'f09c6838-ffad-47d4-ac9e-28f932775532'
            }
        })
        .then(this._checkResponse)
    }

    // Получение начальных карточек с сервера
    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-40/cards', {
            method: 'GET',
            headers: {
                'authorization': 'f09c6838-ffad-47d4-ac9e-28f932775532'
        }
        })
        .then(this._checkResponse)
      }

    // Редактирование профиля
    updateUserInfo(userName, userInterest) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-40/users/me', {
            method: 'PATCH',
            headers: {
                'authorization': 'f09c6838-ffad-47d4-ac9e-28f932775532',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userName,
                about: userInterest
            })
        })
        .then(this._checkResponse)
    }

    // Редактирование аватара
    editAvatar(avatarLink) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-40/users/me/avatar', {
            method: 'PATCH',
            headers: {
                    'authorization': 'f09c6838-ffad-47d4-ac9e-28f932775532',
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatarLink
            })
        })
        .then(this._checkResponse)
    }

    // Добавление пользователем новой карточки
    addCard(cardName, cardLink) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-40/cards', {
            method: 'POST',
            headers: {
                authorization: 'f09c6838-ffad-47d4-ac9e-28f932775532',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: cardName,
                link: cardLink
            })
        })
        .then(this._checkResponse)
    }

    // Простановка лайка
    likeCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-40/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                'authorization': 'f09c6838-ffad-47d4-ac9e-28f932775532'
            }
        })
        .then(this._checkResponse)
    }

    // Снятие лайка
    deleteLikeCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-40/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                'authorization': 'f09c6838-ffad-47d4-ac9e-28f932775532'
            }
        })
        .then(this._checkResponse)
    }

    // Удаление карточки
    deleteCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-40/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'authorization': 'f09c6838-ffad-47d4-ac9e-28f932775532'
            }
        })
        .then(this._checkResponse)
    }
}












