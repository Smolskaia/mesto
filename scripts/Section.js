/* ## Создайте класс `Section` 
(Класс Section будет 
решать отдельную задачу — вставку элементов в разметку.)

Создайте класс `Section`, который отвечает за отрисовку элементов на странице. 
Этот класс:

- Первым параметром конструктора принимает объект с двумя свойствами: 
`items` и `renderer`. Свойство `items` — это массив данных, 
которые нужно добавить на страницу при инициализации класса. 
Свойство `renderer` — это функция, которая отвечает за создание и отрисовку данных
 на странице.
- Второй параметр конструктора — селектор контейнера, 
в который нужно добавлять созданные элементы.

- Содержит публичный метод, который отвечает за отрисовку всех элементов. 
Отрисовка каждого отдельного элемента должна осуществляться функцией `renderer`.
- Содержит публичный метод `addItem`, который принимает DOM-элемент и добавляет 
его в контейнер.

У класса `Section` нет своей разметки. Он получает разметку через функцию-колбэк 
и вставляет её в контейнер.

Section нужны два метода:
setItem — принимает параметр element и вставляет его в контейнер методом append.
renderItems — перебирает массив данных _initialArray. 
Вызывает для каждого элемента массива метод setItem. */

class Section {
  constructor({ data, renderer }, cardListSelector) {
    //items это массив данных, которые нужно добавить на страницу при инициализации класса
    this._initialCards = data; 
    //renderer` — это функция, которая отвечает за создание и отрисовку данных на странице.
    this._renderer = renderer;
    //селектор контейнера, в который нужно добавлять созданные элементы.
    this._container = document.querySelector(cardListSelector);
    
  }

  //публичный метод, который отвечает за отрисовку всех элементов
  renderItems() {
// фукция добавления исходного массива карточек на страницу
this._initialCards.forEach((item) => {
  
  this._renderer(item);;
});

// метод создания карточки перед всеми остальными карточками
addItem(item) {
  this._container.prepend(createCard(item));
}
// метод, который создает новый экземпряр класса
createCard(item) {  
  const card = new Card(item, '#card-template', openPopupImage);
  // console.log('card =>', card);
  return card.generateCard();

  // Вставим разметку на страницу,
    // используя метод setItem класса Section
    this.addItem(item);
}
}

// метод создания карточки перед всеми остальными карточками
  setItem(element) {
    this._container.prepend(element);
  }
} 

// ./pages/index.js
const defaultCardList = new Section(({ data: items }, cardListSelector))

const cardsList = new Section({
  data: items,
  //Функция renderer — это инструкция. 
  //Класс Section получает её в index.js при создании.
  renderer: (cardItem) => { // Обратите внимание на параметр messageItem
    const card = cardItem.isOwner
      ? new UserMessage(cardItem, '.message-template_type_user')
      : new DefaultMessage(cardItem, '.message-template_type_default');

    const message = message.generateCard();

    cardsList.setItem(cardElement);
  }
},
cardListSection
);

cardsList.renderItems(); 

