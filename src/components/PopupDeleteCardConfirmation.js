import { Popup } from "./Popup.js";

export class PopupDeleteCardConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._button = this._popup.querySelector(".popup__btn-save");
    this._handleFormSubmit = handleFormSubmit;
  }

  
  // удаление карточки по нажатию на кнопку
  setEventListeners() {
    // добавляем обработчик клика иконке закрытия
    super.setEventListeners();
    // добавляем обработчик сабмита формы
    this._form.addEventListener("submit", (evt) => {
      // отменим стандартное поведение
      evt.preventDefault();
      // добавим вызов функции _handleFormSubmit
      this._handleFormSubmit(this._cardId, this._card);
      super.close();
    });
  }

  // метод меняет текст на кнопке
  setButtonText(text) {
    this._button.textContent = text;
  }


  open(cardId, card) {
    super.open()
    this._cardId = cardId;
    this._card = card;
  }
}