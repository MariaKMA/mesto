(()=>{"use strict";var e=document.querySelector(".popup__container_type_user"),t=document.querySelector(".popup__container_type_place"),n=document.querySelector(".profile__edit-btn"),r=e.querySelector(".popup__user_type_name"),o=e.querySelector(".popup__user_type_interest"),i=document.querySelector(".cards"),c=document.querySelector(".profile__add-btn"),a=document.querySelector(".profile__user-name"),u=document.querySelector(".profile__user-interest"),s=document.querySelector(".profile__avatar"),l=document.querySelector(".profile__avatar-aria"),f=document.querySelector(".profile__avatar-edit-btn"),p={formSelector:".popup__form",inputSelector:".popup__input",errorInputClass:"popup__input_type_error",errorClass:"popup__error_active",submitButtonSelector:".popup__save-btn",submitButtonErrorClass:"popup__save-btn_invalid"};function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var _=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formElement=n,this._config=t,this._inputs=Array.from(this._formElement.querySelectorAll(this._config.inputSelector)),this._button=this._formElement.querySelector(this._config.submitButtonSelector)}var t,n;return t=e,(n=[{key:"_handleSubmit",value:function(e){e.preventDefault()}},{key:"_showInputError",value:function(e,t){var n=this._formElement.querySelector(".".concat(e.id,"-error"));n.classList.add(this._config.errorClass),e.classList.add(this._config.errorInputClass),n.textContent=t}},{key:"_hideInputError",value:function(e){var t=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._config.errorInputClass),t.classList.remove(this._config.errorClass),t.textContent=""}},{key:"setSubmitButtonState",value:function(){this._button.disabled=!this._formElement.checkValidity(),this._button.classList.toggle(this._config.submitButtonErrorClass,!this._formElement.checkValidity())}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_setFormListeners",value:function(){var e=this;this._formElement.addEventListener("submit",this._handleSubmit),this._inputs.forEach((function(t){return t.addEventListener("input",(function(){e._checkInputValidity(t),e.setSubmitButtonState()}))}))}},{key:"enableValidation",value:function(){this._setFormListeners()}}])&&h(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var y=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderedItems=r,this._container=n,this._renderer=o}var t,n;return t=e,(n=[{key:"addItem",value:function(e){this._container.prepend(e)}},{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){t._renderer(e)}))}}])&&d(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function v(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var m=function(){function e(t,n,r,o,i,c,a,u){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._link=t,this._name=n,this._likes=r,this._cardSelector=o,this._canDelete=i,this._handleCardClick=c,this._handleCardLike=a,this._handleCardDelete=u}var t,n;return t=e,(n=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0)}},{key:"generate",value:function(){return this._card=this._getTemplate(),this._cardImage=this._card.querySelector(".card__img"),this.likeIcon=this._card.querySelector(".card__like-icon"),this._trashIcon=this._card.querySelector(".card__trash-icon"),this._cardCaption=this._card.querySelector(".card__caption"),this._likesCounter=this._card.querySelector(".card__likes-counter"),this._canDelete||(this._trashIcon.style.display="none"),this._setEventListeners(),this._cardImage.src=this._link,this._cardImage.alt=this._name,this._cardCaption.textContent=this._name,this._likesCounter.textContent=this._likes,this._card}},{key:"_setEventListeners",value:function(){var e=this;this.likeIcon.addEventListener("click",(function(){e._likeIconClick()})),this._trashIcon.addEventListener("click",(function(){e._deleteCardClick()})),this._cardImage.addEventListener("click",(function(){e._handleCardClick(e._link,e._name)}))}},{key:"updateLikesCount",value:function(e){this._likesCounter.textContent=e.likes.length}},{key:"_likeIconClick",value:function(){this._handleCardLike(),this.likeIcon.classList.toggle("card__like-icon_active")}},{key:"_deleteCardClick",value:function(){this._handleCardDelete()}},{key:"removeCard",value:function(){this._card.remove(),this._card=null}}])&&v(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function b(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var k=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._popupCloseBtn=this._popup.querySelector(".popup__close-btn"),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_active"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_active"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("click",(function(t){t.target.classList.contains("popup_active")&&e.close()})),this._popupCloseBtn.addEventListener("click",(function(){e.close()}))}}])&&b(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function g(e){return g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},g(e)}function w(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function S(){return S="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=E(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},S.apply(this,arguments)}function E(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=j(e)););return e}function C(e,t){return C=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},C(e,t)}function O(e,t){if(t&&("object"===g(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function j(e){return j=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},j(e)}var I=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&C(e,t)}(c,e);var t,n,r,o,i=(r=c,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=j(r);if(o){var n=j(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return O(this,e)});function c(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(n=i.call(this,e))._popup=document.querySelector(e),n._inputList=n._popup.querySelectorAll(".popup__input"),n._formElement=n._popup.querySelector(".popup__container"),n._submitBtn=n._popup.querySelector(".popup__save-btn"),n._handleFormSubmit=t,n}return t=c,(n=[{key:"_getInputValues",value:function(){var e=this;return this._inputValues={},this._inputList.forEach((function(t){e._inputValues[t.name]=t.value})),this._inputValues}},{key:"setEventListeners",value:function(){var e=this;S(j(c.prototype),"setEventListeners",this).call(this),this._formElement.addEventListener("submit",(function(t){t.preventDefault(),e._submitBtn.textContent="Сохранение...",e._handleFormSubmit(e._getInputValues())}))}},{key:"close",value:function(){S(j(c.prototype),"close",this).call(this),this._formElement.reset()}}])&&w(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),c}(k);function L(e){return L="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},L(e)}function P(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function q(){return q="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=T(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},q.apply(this,arguments)}function T(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=D(e)););return e}function R(e,t){return R=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},R(e,t)}function x(e,t){if(t&&("object"===L(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function D(e){return D=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},D(e)}var B=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&R(e,t)}(c,e);var t,n,r,o,i=(r=c,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=D(r);if(o){var n=D(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return x(this,e)});function c(e,t,n){var r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(r=i.call(this,n))._link=e,r._name=t,r._popup=document.querySelector(n),r._popupImg=r._popup.querySelector(".popup__image"),r._popupCaption=r._popup.querySelector(".popup__header_type_view-pic"),r}return t=c,(n=[{key:"open",value:function(){this._popupImg.src=this._link,this._popupImg.alt=this._name,this._popupCaption.textContent=this._name,q(D(c.prototype),"open",this).call(this)}}])&&P(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),c}(k);function N(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var V=function(){function e(t){var n=t.userNameSelector,r=t.userInterestSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._userNameSelector=n,this._userInterestSelector=r,this._userName=document.querySelector(this._userNameSelector),this._userInterest=document.querySelector(this._userInterestSelector)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return this._userData={},this._userData.userName=this._userName.textContent,this._userData.userInterest=this._userInterest.textContent,this._userData}},{key:"setUserInfo",value:function(e){this._userName.textContent=e.userName,this._userInterest.textContent=e.userInterest}}])&&N(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function z(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var A=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._url=t,this._headers=n}var t,n;return t=e,n=[{key:"getInfo",value:function(){return fetch(this._url,{method:"GET",headers:this._headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"updateInfo",value:function(e,t){return fetch(this._url,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e,about:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"addCard",value:function(e,t){return fetch(this._url,{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"likeCard",value:function(){return fetch(this._url,{method:"PUT",headers:this._headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"deleteLikeCard",value:function(){return fetch(this._url,{method:"DELETE",headers:this._headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"deleteCard",value:function(){return fetch(this._url,{method:"DELETE",headers:this._headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"editAvatar",value:function(e){return fetch(this._url,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}}],n&&z(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function F(e){return F="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},F(e)}function U(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function J(){return J="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=H(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},J.apply(this,arguments)}function H(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=K(e)););return e}function G(e,t){return G=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},G(e,t)}function M(e,t){if(t&&("object"===F(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function K(e){return K=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},K(e)}var Q=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&G(e,t)}(c,e);var t,n,r,o,i=(r=c,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=K(r);if(o){var n=K(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return M(this,e)});function c(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(n=i.call(this,e))._popup=document.querySelector(e),n._btnElement=n._popup.querySelector(".popup__container"),n._handleFormSubmit=t,n}return t=c,(n=[{key:"setEventListeners",value:function(){var e=this;J(K(c.prototype),"setEventListeners",this).call(this),this._btnElement.addEventListener("click",(function(){e._handleFormSubmit()}))}}])&&U(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),c}(k);new A("https://nomoreparties.co/v1/cohort-40/users/me",{authorization:"f09c6838-ffad-47d4-ac9e-28f932775532"}).getInfo().then((function(e){a.textContent=e.name,u.textContent=e.about,s.src=e.avatar})).catch((function(e){console.log(e)}));var W=new I(".popup_type_user",(function(e){new A("https://mesto.nomoreparties.co/v1/cohort-40/users/me",{authorization:"f09c6838-ffad-47d4-ac9e-28f932775532","Content-Type":"application/json"}).updateInfo(e.userName,e.userInterest).catch((function(e){console.log(e)})),Z.setUserInfo(e),W.close()}));W.setEventListeners();var X=new I(".popup_type_avatar",(function(e){var t=e.avatarLink;new A("https://mesto.nomoreparties.co/v1/cohort-40/users/me/avatar",{authorization:"f09c6838-ffad-47d4-ac9e-28f932775532","Content-Type":"application/json"}).editAvatar(t).then((function(e){s.src=e.avatar})).catch((function(e){console.log(e)})),X.close()}));X.setEventListeners();var Y=new I(".popup_type_place",(function(e){new A("https://mesto.nomoreparties.co/v1/cohort-40/cards",{authorization:"f09c6838-ffad-47d4-ac9e-28f932775532","Content-Type":"application/json"}).addCard(e.placeTitle,e.imageLink).then((function(e){var t=ee(e.link,e.name,e.likes.length,e._id,!0);te.addItem(t)})).catch((function(e){console.log(e)})),Y.close()}));Y.setEventListeners();var Z=new V({userNameSelector:".profile__user-name",userInterestSelector:".profile__user-interest"});new _(p,e).enableValidation();var $=new _(p,t);function ee(e,t,n,r,o){var i=new m(e,t,n,".card-template",o,(function(e,t){var n=new B(e,t,".popup_type_view-pic");n.setEventListeners(),n.open()}),(function(){var e=new A("https://mesto.nomoreparties.co/v1/cohort-40/cards/".concat(r,"/likes"),{authorization:"f09c6838-ffad-47d4-ac9e-28f932775532"});i.likeIcon.classList.contains("card__like-icon_active")?e.deleteLikeCard().then((function(e){i.updateLikesCount(e)})).catch((function(e){console.log(e)})):e.likeCard().then((function(e){i.updateLikesCount(e)})).catch((function(e){console.log(e)}))}),(function(){var e=new Q(".popup_type_delete-card",(function(){new A("https://mesto.nomoreparties.co/v1/cohort-40/cards/".concat(r),{authorization:"f09c6838-ffad-47d4-ac9e-28f932775532"}).deleteCard().catch((function(e){console.log(e)})),i.removeCard(),e.close()}));e.setEventListeners(),e.open()}));return i.generate()}$.enableValidation();var te=new y({items:[],renderer:function(e){var t="ead37e227a5255f9ff26c281"===e.owner._id,n=ee(e.link,e.name,e.likes.length,e._id,t);te.addItem(n)}},i);new A("https://mesto.nomoreparties.co/v1/cohort-40/cards",{authorization:"f09c6838-ffad-47d4-ac9e-28f932775532"}).getInfo().then((function(e){te.renderItems(e)})).catch((function(e){console.log(e)})),n.addEventListener("click",(function(){var e=Z.getUserInfo();r.value=e.userName,o.value=e.userInterest,W.open()})),l.addEventListener("mouseover",(function(e){e.target.style.opacity="0.8",e.target.style.backgroundColor="black",f.style.visibility="visible"})),l.addEventListener("mouseout",(function(e){e.target.style.opacity="1",f.style.visibility="hidden"})),f.addEventListener("click",(function(){X.open()})),c.addEventListener("click",(function(){Y.open(),$.setSubmitButtonState()}))})();