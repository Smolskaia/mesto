/* ## Создайте класс `Popup`

Создайте класс `Popup`, который отвечает за открытие и закрытие попапа. 
Этот класс:

- Принимает в конструктор единственный параметр — селектор попапа.
- Содержит публичные методы `open` и `close`, которые отвечают за открытие 
и закрытие попапа.
- Содержит приватный метод `_handleEscClose`, который содержит логику закрытия 
попапа клавишей Esc.
- Содержит публичный метод `_setEventListeners`, который добавляет слушатель 
клика иконке закрытия попапа. */

export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    // установка обработчика закрытия попапа по кл Esc в момент открытия попапа
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    // удаление обработчика закрытия попапа по кл Esc в момент открытия попапа
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // приватный метод _handleEscClose, 
  // содержит логику закрытия попапа клавишей Esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
      }
  }

  // метод setEventListeners добавляет слушатель клика иконке закрытия попапа. 
  // Модальное окно также закрывается при клике на затемнённую 
  // область вокруг формы.
  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      // закрытие по клику на оверлей
      if (evt.target.classList.contains('popup_opened') ||
      // закрытие по клику на крестик
      evt.target.classList.contains('popup__btn-close')) {
        this.close();
      }
    })
  }

}
