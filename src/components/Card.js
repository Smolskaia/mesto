// Передаем данные в класс Card в виде объекта data, а в самом классе присваиваем полям нужные свойства.
// templateSelector - селектор шаблона
export class Card {
  constructor(data, templateSelector, openPopupImage, 
    handleCardDelete,/*handleLikeClick,*/ userId) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._likeCounter = data.likes.length;

    this._userId = userId;
    // console.log('my id =>', userId)
    this._templateSelector = templateSelector;
    this._openPopupImage = openPopupImage;
    this._handleCardDelete = handleCardDelete;
    // this._handleLikeClick = handleLikeClick;
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
  this._deleteButton.addEventListener('click', () => {
    this._handleCardDelete(this._cardId, this._card);
  });
  this._likeButton.addEventListener('click', () => {
    this._toggleLike();
  });
  this._cardImage.addEventListener('click', () => {
    this._openPopupImage(this._name, this._link);
  });
}


// метод переключения лайка
_toggleLike() {
  this._likeButton.classList.toggle('element__like_active');
}

// Метод готовит карточку к публикации.
generateCard() {
  // Запишем разметку в приватное поле _card. Так у других элементов появится доступ к ней.
  this._card = this._getTemplate();
  // this._isliked = this._likes.some(like => like._id === userId);
  
  // Объявим классовые переменные
  this._cardImage = this._card.querySelector('.element__img');
  this._likeButton = this._card.querySelector('.element__like');
  this._deleteButton = this._card.querySelector('.element__delete');
  
  // если текущий пользователь не является владельцем карточки - удалить корзину
  if (this._ownerId !== this._userId) {
    this._deleteButton.remove();
  }

  // Добавим данные
  this._cardImage.alt = this._name;
  this._cardImage.src = this._link;
  this._card.querySelector('.element__title').textContent = this._name;
  
  // добавим обработчики
  this._setEventListeners(); 
  // Вернём элемент наружу
  return this._card;
  } 

}


