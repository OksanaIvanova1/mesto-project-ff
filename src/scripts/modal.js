export function openModal(popup) {
  popup.classList.add("popup_is-opened");

  const buttonClose = popup.querySelector(".popup__close");
  buttonClose.addEventListener("click", function (evt) {
    closeModal(popup);
  });

  popup.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup")) {
      closeModal(popup);
    }
  });

  function escapeHandler(evt) {
    if (evt.key === "Escape") {
      closeModal(popup);
      document.removeEventListener("keydown", escapeHandler);
    }
  }

  document.addEventListener("keydown", escapeHandler);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}
