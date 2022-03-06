// Закрыть попап

export function closePopup(popup) {
    popup.classList.remove('popup_active');
    document.removeEventListener('keydown', closePopupEsc);
    document.removeEventListener('click', closePopupOverlay);
}

// Закрыть попап по нажатию на esc

export function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_active');
        closePopup(popup);
    }
}

// Закрыть попап по нажатию на overlay

export function closePopupOverlay(evt) {
    if (evt.target.classList.contains('popup_active')) {
        closePopup(evt.target);
    }
}