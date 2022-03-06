import {closePopup, closePopupEsc, closePopupOverlay} from "./closePopup.js";

// Открыть попап

export function openPopup(popup) {
    popup.classList.add('popup_active');
    document.addEventListener('keydown', closePopupEsc);
    document.addEventListener('click', closePopupOverlay);
}