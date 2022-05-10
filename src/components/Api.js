export default class Api {
    constructor(url, headers) {
        this._url = url;
        this._headers = headers;
    }

    getInfo() {
        return fetch(this._url, {
            method: 'GET',
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    updateInfo(userName, userInterest) {
        return fetch(this._url, {
            method: 'PATCH',
            headers: this._headers,
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

    addCard(cardName, cardLink) {
        return fetch(this._url, {
            method: 'POST',
            headers: this._headers,
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

    likeCard() {
        return fetch(this._url, {
            method: 'PUT',
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    deleteLikeCard() {
        return fetch(this._url, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    deleteCard() {
        return fetch(this._url, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    editAvatar(avatarLink) {
        return fetch(this._url, {
            method: 'PATCH',
            headers: this._headers,
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
}












