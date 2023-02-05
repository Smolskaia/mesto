import { Popup } from './Popup.js';

// классс PopupWithImage` наследует от `Popup`
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._image = this._popup.querySelector('.popup__image');
    this._title = this._popup.querySelector('.popup__description');

  }
  
  //  класс должен перезаписывать родительский метод `open`. 
  // В методе `open` класса `PopupWithImage` нужно вставлять в попап 
  // картинку и атрибут `src` изображения
  open(name, link) {
    super.open();
    this._image.src = link;
    this._image.alt = name;
    this._title.textContent = name;

  }
  

}

