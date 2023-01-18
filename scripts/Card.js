/* Создайте класс `Card`, который создаёт карточку с текстом и ссылкой на изображение:

- принимает в конструктор её данные и селектор её template-элемента;
- содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
- содержит приватные методы для каждого обработчика;
- содержит один публичный метод, который возвращает полностью работоспособный и 
наполненный данными элемент карточки.

Для каждой карточки создайте экземпляр класса `Card`.

Каждый класс ( Card , FormValidator ) описан в отдельном JS-файле и импортирован в index.js ;
Экземпляр класса Card создаётся для каждой карточки. Класс Card должен:
Принимать в конструктор ссылки на изображение и текст;
Принимать в конструктор селектор для template -элемента с шаблоном разметки;
Чеклист для самопроверки. 7 Спринт. 2
Обладать приватными методами, которые установят слушателей событий, обработают клики,
подготовят карточку к публикации;
Обладать публичным методом, который вернёт готовую разметку, с установленными слушателями
событий.
Экземпляр класса FormValidator создаётся для каждой проверяемой формы. Этот класс должен:
Принимать в конструктор объект настроек с классами формы;
Принимать в конструктор ссылку на HTML-элемент проверяемой формы;
Содержать приватные методы для обработки формы. В методах за объектом настроек следует
обращаться к полю класса, а не передавать его в каждый метод, как это было реализовано ранее;
Содержать публичный метод enableValidation — вызовите его после создания экземпляра класса.
Каждый класс выполняет строго одну задачу. Всё, что относится к решению этой задачи, находится в
классе. Ни один другой класс к решению этой задачи не относится.

*/


// Передаем данные в класс Card в виде объекта data, а в самом классе присваиваем полям нужные свойства.
// templateSelector - селектор шаблона

// импортировать функцию открытия картинки
import { openPopupImage } from './index.js';

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

/* Чтобы получить нужную разметку, добавьте классу Card метод _getTemplate, который:
найдёт template-элемент с id card-template, извлечёт его содержимое,
в содержимом найдёт элемент с классом element, клонирует его,
вернёт клонированный элемент. 
Приватный метод, возвращающий разметку из template-элемента через return*/
_getTemplate() {
  // забираем разметку из HTML и клонируем элемент
  const cardElement = document
    // .querySelector('#card-template')
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
  // вернём DOM-элемент карточки
  return cardElement;
}

// слушатель события по кнопке лайк, корзина, открытие картинки на весь экран
// создаем для этого приватный метод _setEventListeners
/* Чтобы установить слушатель события, нужна стрелочная функция. 
Только она позволит обратиться к _handleMessageClick через this.*/
_setEventListeners() {
  this._card.querySelector('.element__like').addEventListener('click', () => {
    this._toggleLike();
  });
  this._card.querySelector('.element__delete').addEventListener('click', () => {
    this._deleteCard();
  });
  this._card.querySelector('.element__img').addEventListener('click', () => {
    this._openImagePopup(this._name, this._link);
  });
}

// метод переключения лайка
_toggleLike() {
  this._card.querySelector('.element__like').classList.toggle('element__like_active');
}

// метод удаления карточки
_deleteCard() {
  this._card.remove();
}

// метод открытия попапа с картинкой
_openImagePopup() {
  openPopupImage(this._name, this._link);
}

// Метод готовит карточку к публикации.
generateCard() {
  // Запишем разметку в приватное поле _card. 
  // Так у других элементов появится доступ к ней.
  this._card = this._getTemplate();
  
  // Добавим данные
  this._card.querySelector('.element__img').alt = this._name;
  this._card.querySelector('.element__img').src = this._link;
  this._card.querySelector('.element__title').textContent = this._name;
  
  // добавим обработчики
  this._setEventListeners(); 
  // Вернём элемент наружу
  return this._card;
  } 

}

/*цикл forEach обойдёт массив initialCards и для каждого его элемента: 
создаст новый экземпляр класса Card,
подготовит карточку к публикации,
добавит новую карточку в DOM.*/

// initialCards.forEach((item) => {
// // Создадим экземпляр карточки
// // При создании карточки передайте ей два аргумента — объект с данными и селектор template-элемента
// const card = new Card(item, '#card-template');
// // console.log(item.link) 
// // Создаём карточку и возвращаем наружу
// const cardElement = card.generateCard();

// // Добавляем в DOM
// document.querySelector('.elements__list').append(cardElement);
// });


