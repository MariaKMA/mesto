export default class Api {
    constructor(baseUrl, headers) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    // Получение данных пользователя с сервера
    getUserInfo() {
        return fetch('https://nomoreparties.co/v1/cohort-40/users/me', {
            method: 'GET',
            headers: {
                'authorization': 'f09c6838-ffad-47d4-ac9e-28f932775532'
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
    // Получение начальных карточек с сервера
    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-40/cards', {
            method: 'GET',
            headers: {
                'authorization': 'f09c6838-ffad-47d4-ac9e-28f932775532'
        }
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
          });
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
        .then(res => {
            if (res.ok) {
                return res.json()
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
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
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
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
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    // Простановка лайка
    likeCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-40/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                'authorization': 'f09c6838-ffad-47d4-ac9e-28f932775532'
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    // Снятие лайка
    deleteLikeCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-40/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                'authorization': 'f09c6838-ffad-47d4-ac9e-28f932775532'
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    // Удаление карточки
    deleteCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-40/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'authorization': 'f09c6838-ffad-47d4-ac9e-28f932775532'
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
}












