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
    this._form = this._popup.querySelector('.popup__form');
    // console.log(this._form);
  }

// метод собирает массив всех полей в форме, обходит их и добавляет их значения в объект. 
//Ключами этого объекта будут атрибуты name каждого поля:
  _getInputValues() {
    // достаём все элементы полей
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    // создаем пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    // возвращаем объект значений
    return this._formValues;
  } 

  setEventListeners() {
    // добавляем обработчик клика иконке закрытия
    super.setEventListeners();
    // добавляем обработчик сабмита формы
    this._form.addEventListener('submit', (evt) => {
      // отменим стандартное поведение
      evt.preventDefault();
      // добавим вызов функции _handleFormSubmit
      // передадим ей объект — результат работы _getInputValues
      this._handleFormSubmit(this._getInputValues());
      // console.log(this._getInputValues);
    })
  }

  close() {
    super.close();
    // сброс формы при закрытии попапа
    this._form.reset();
  }

}


// // ./pages/index.js

// // создаём экземпляр формы
// const form = new SubmitForm({ 
//   selector: '.form-template',
//   // объект, который мы передадим при вызове handleFormSubmit
//   // окажется на месте параметра formData
//   //Параметр formData функции — это значение, которое мы передаём 
//   //в this._handleFormSubmit при вызове. 
//   //То есть это объект, возвращающий метод _getInputValues
//   handleFormSubmit: (formData) => {
//     // при создании экземпляра UserMessage передаём
//     // ему объект с данными формы
//     const message = new UserMessage(formData, '.message-template_type_user');

//     const messageElement = message.generate();

//     cardsList.setItem(messageElement);
//   }
// }); 
// });

// // генерируем разметку формы
// const formElement = form.generate();

// // инициализируем класс, ответственный
// // за добавление формы на страницу
// const formRenderer = new Section({
//     data: []
// }, '.form-section');

// // добавляем форму на страницу
// formRenderer.setItem(formElement); 