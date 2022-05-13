export default class UserInfo {
    constructor({userNameSelector, userInterestSelector, avatarSelector}) {
        this._userNameSelector = userNameSelector;
        this._userInterestSelector = userInterestSelector;
        this._avatarSelector = avatarSelector;
        this._userId = '';
        this._userName = document.querySelector(this._userNameSelector);
        this._userInterest = document.querySelector(this._userInterestSelector);
        this._avatar = document.querySelector(this._avatarSelector);

    }

// Возвращаем объект с данными пользователя для подстановки этих данных в форму при ее открытии
    getUserInfo() {
        return {
            userId: this._userId,
            userName: this._userName.textContent,
            userInterest: this._userInterest.textContent,
        };
    }

    // Принимаем новые данные и добавляем их на страницу
    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userInterest.textContent = data.about;
    }

    // Принимаем ссылку на аватар и передаем ее в img на странице
    setAvatar(data) {
        this._avatar.src = data.avatar;
    }

    // Установка userId
    setUserId(data) {
        this._userId = data._id;
    }
}