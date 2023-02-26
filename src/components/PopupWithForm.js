/* класс `PopupWithForm` наследует от `Popup`. 
Этот класс:
- Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
- Содержит приватный метод `_getInputValues`, который собирает данные 
всех полей формы.
 */

import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._popup.querySelectorAll(".popup__input"));
    this._button = this._form.querySelector(".popup__btn-save");
  }

  // метод собирает массив всех полей в форме, обходит их и добавляет их значения в объект.
  //Ключами этого объекта будут атрибуты name каждого поля:
  _getInputValues() {
    // создаем пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    // возвращаем объект значений
    return this._formValues;
  }

  // метод меняет текст на кнопке
  setButtonText(text) {
    this._button.textContent = text;
  }

  // метод вставляет данные в инпуты
  setInputValues(data) {
    this._inputList.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    // добавляем обработчик клика иконке закрытия
    super.setEventListeners();
    // добавляем обработчик сабмита формы
    this._form.addEventListener("submit", (evt) => {
      // отменим стандартное поведение
      evt.preventDefault();
      // добавим вызов функции _handleFormSubmit
      // передадим ей объект — результат работы _getInputValues
      this._handleFormSubmit(this._getInputValues());
      // console.log(this._getInputValues);
    });
  }

  close() {
    super.close();
    // сброс формы при закрытии попапа
    this._form.reset();
  }
}
