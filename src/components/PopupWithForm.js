/* ## Создайте класс `PopupWithForm`

Создайте класс `PopupWithForm`, который наследует от `Popup`. Этот класс:

- Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
- Содержит приватный метод `_getInputValues`, который собирает данные 
всех полей формы.
- Перезаписывает родительский метод `_setEventListeners`. 
Метод `_setEventListeners` класса `PopupWithForm` должен 
не только добавлять обработчик клика иконке закрытия, 
но и добавлять обработчик сабмита формы.
- Перезаписывает родительский метод `close`,
 так как при закрытии попапа форма должна ещё и сбрасываться.

`PopupWithForm`

Для каждого попапа создавайте свой экземпляр класса `PopupWithForm`. */

//класс создаёт элемент формы
// class SubmitForm {
//   constructor({ selector, handleFormSubmit }) {
//     this._selector = selector;
//     this._handleFormSubmit = handleFormSubmit;
//   }
// } 
// //метод _getElement, который клонирует и возвращает разметку формы
// _getElement() {
//   const formElement = document
//   .querySelector(this._selector)
//   .content
//   .querySelector('.form')
//   .cloneNode(true);

// return formElement;
// } 

// _setEventListeners() {
//   // при сабмите формы
//   this._element.addEventListener('submit', (evt) => {
//     // отменим стандартное поведение
//     evt.preventDefault();

//     // добавим вызов функции _handleFormSubmit
//     // передадим ей объект — результат работы _getInputValues
//     this._handleFormSubmit(this._getInputValues());

//     // и сбросим её поля
//     this._element.reset();
//   })
// } 

// generate() {
//   this._element = this._getElement(); // создаём элемент
//   this._setEventListeners(); // добавляем обработчики

//     return this._element; // возвращаем наружу
// } 


// //метод собирает массив всех полей в форме, обходит их и добавляет их значения в объект. 
// //Ключами этого объекта будут атрибуты name каждого поля:
// _getInputValues() {
//   // достаём все элементы полей
//   this._inputList = this._element.querySelectorAll('.form__input');

//   // создаём пустой объект
//   this._formValues = {};

//   // добавляем в этот объект значения всех полей
//   this._inputList.forEach(input => {
//     this._formValues[input.name] = input.value;
//   });

//   // возвращаем объект значений
//   return this._formValues;
// } 

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