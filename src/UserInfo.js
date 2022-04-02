// import {profileUserName, profileUserInterest} from './data.js';

export default class UserInfo {
    constructor({userNameSelector, userInterestSelector}) {
        this._userNameSelector = userNameSelector;
        this._userInterestSelector = userInterestSelector;
        this._userName = document.querySelector(this._userNameSelector);
        this._userInterest = document.querySelector(this._userInterestSelector);

    }

// Возвращаем объект с данными пользователя для подстановки этих данных в форму при ее открытии
    getUserInfo() {
        this._userData = {};
        this._userData['userName'] = this._userName.textContent;
        this._userData['userInterest'] = this._userInterest.textContent;
        return this._userData;
    }

// Принимаем новые данные и добавляем их на страницу
    setUserInfo(data) {
        this._userName.textContent = data.userName;
        this._userInterest.textContent = data.userInterest;
    }
}