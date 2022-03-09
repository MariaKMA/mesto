import {closePopupEsc, closePopupOverlay} from "./closePopup.js";

// Открыть попап

export function openPopup(popup) {
    popup.classList.add('popup_active');
    popup.addEventListener('keydown', closePopupEsc);
    popup.addEventListener('click', closePopupOverlay);
}