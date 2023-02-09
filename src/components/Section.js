/* Класс Section вставляет элементы в разметку, 
отвечает за отрисовку элементов на странице.*/

export class Section {
  constructor({ items, renderer }, container) {
    //items это массив данных, которые нужно добавить на страницу при инициализации класса
    this._initialCards = items;
    //renderer` — это функция, которая отвечает за создание и отрисовку данных на странице.
    this._renderer = renderer;
    //селектор контейнера, в который нужно добавлять созданные элементы.
    this._container = container;
  }

  // метод создания карточки перед всеми остальными карточками,
  // принимает DOM-элемент и добавляет его в контейнер.
  addItem(item) {
    this._container.prepend(item);
  }

  // renderItems — перебирает массив исходных карточек  _initialCards.
  // Вызывает для каждого элемента массива метод addItem,
  //добавляя исходный массив карточек на страницую.
  renderItems() {
    this._initialCards.forEach((item) => {
      this._renderer(item);
    });
  }
}
