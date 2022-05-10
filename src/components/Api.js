// ЗАЧЕМ ЗАГОЛОВКИ В constructor ???
// добавить .then, где отсутствует

export default class Api {
    constructor(url, headers) {
        this._url = url;
        this._headers = headers;
    }

    getInfo() {
        return fetch(this._url, {
            method: 'GET',
            headers: {
                'authorization': 'f09c6838-ffad-47d4-ac9e-28f932775532',
                'Content-Type': 'application/json'
            }
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
            headers: {
                authorization: 'f09c6838-ffad-47d4-ac9e-28f932775532',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userName,
                about: userInterest
            })
        })
    }

    addCard(cardName, cardLink) {
        return fetch(this._url, {
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

    likeCard() {
        return fetch(this._url, {
            method: 'PUT',
            headers: {
                'authorization': 'f09c6838-ffad-47d4-ac9e-28f932775532',
                'Content-Type': 'application/json'
            }
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
            headers: {
                'authorization': 'f09c6838-ffad-47d4-ac9e-28f932775532',
                'Content-Type': 'application/json'
            }
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
            headers: {
                'authorization': 'f09c6838-ffad-47d4-ac9e-28f932775532',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    updateAvatar() {
        return fetch(this._url, {
            method: 'PATCH',
            headers: {
                'authorization': 'f09c6838-ffad-47d4-ac9e-28f932775532',
                'Content-Type': 'application/json'
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












