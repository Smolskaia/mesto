import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

import { validationConfig } from './validationConfig.js'
import { initialCards } from './initialCards.js';

const popupList = document.querySelectorAll('.popup');
// попап для редактирования профия
const popupEditProfile = document.querySelector('.popup_form_edit');
const popupEditForm = popupEditProfile.querySelector('.popup__form');
const inputName = popupEditForm.querySelector('.popup__input_text_name');
const inputInfo = popupEditForm.querySelector('.popup__input_text_info'); 

const popupEditClose = popupEditProfile.querySelector('.popup__btn-close');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__about');

// попап для добавления фото
const popupAddCard = document.querySelector('.popup_form_add');
const formAddCard = popupAddCard.querySelector('.popup__form');
const descriptionAddCard = popupAddCard.querySelector('.popup__input_text_name');
const linkAddCard = popupAddCard.querySelector('.popup__input_text_info');
const btnAddCardSubmit = popupAddCard.querySelector('.popup__btn-save');

// попап для просмотра изображения
const popupViewer = document.querySelector('.popup_form_viewer');
const popupViewerContainer = popupViewer.querySelector('.popup__container-img');
const popupViewerImage = popupViewer.querySelector('.popup__image');
const popupViewerDescription = popupViewer.querySelector('.popup__description');

// Кнопки закрытия попапов
const popupCloseButtons = document.querySelectorAll('.popup__btn-close');
// Кнопки открытия попапов
const buttonAdd = document.querySelector('.profile__btn-add');
const buttonEdit = document.querySelector('.profile__btn-edit');
const popupOpenImg = document.querySelectorAll('.element__img');

// Массив инпутов
const inputCardList = Array.from(popupAddCard.querySelectorAll('.popup__input'));

// функция открытия любого попапа
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
}

// функция открытия попапа с картинкой
function openPopupImage(name, link) {
  openPopup(popupViewer);
  fillPopupViewerData(name, link)
}

buttonEdit.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputInfo.value = profileInfo.textContent;
  openPopup(popupEditProfile);
})

buttonAdd.addEventListener('click', () => {
  validationFormAddCard.resetValidation();
  openPopup(popupAddCard);
})
 

//Заполнить данные: картинку и название карточки для попапа
function fillPopupViewerData(name, link) {
  popupViewerImage.src = link;
  popupViewerImage.alt = name;
  popupViewerDescription.textContent = name;
}

// Находим контейнер в DOM, куда вставляем массив
const cardsList = document.querySelector('.elements__list');
// создаём элемент списка. Чтобы получить содержимое template, обращаемся к его свойству content
// const cardsTemplate = document.querySelector('#card-template').content;

// функция, которая создает новый экземпряр класса
function createCard(item) {  
  const card = new Card(item, '#card-template', openPopupImage);
  return card.generateCard();
}

// функция создания карточки перед всеми остальными карточками
function addCard(item) {
  cardsList.prepend(createCard(item));
}

// фукция добавления исходного массива карточек на страницу
initialCards.forEach((item) => {
  addCard(item);
});

// создаем экземпляры класса FormValidator
// для формы добавления карточки
const validationFormAddCard = new FormValidator(validationConfig, formAddCard);
validationFormAddCard.enableValidation();
// для формы редаутирования профиля
const validationFormEditCard = new FormValidator(validationConfig, popupEditForm);
validationFormEditCard.enableValidation();

// функция закрывает окно попапа
function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
}

// Обработчик закрытия по нажатию на крестик и на оверлей
popupList.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened') ||
    evt.target.classList.contains('popup__btn-close')) {
      closePopup(item);
    }
  })
})  

// функция для закрытия попапа клавишей Esc
function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
    }
  }

//Обработчик формы Добавления карточки
function handleFormSubmitAddCard (evt) {
  evt.preventDefault();
  const data = {
   name: descriptionAddCard.value,
   link: linkAddCard.value
  }
 
  addCard(data);
  formAddCard.reset();
  closePopup(popupAddCard);
}

// Обработчик формы Редактирования профиля
function handleFormSubmitEditCard (evt) {
  evt.preventDefault();  
  profileName.textContent = inputName.value;;
  profileInfo.textContent = inputInfo.value;

  popupEditForm.reset();

  closePopup(popupEditProfile);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupEditForm.addEventListener('submit', handleFormSubmitEditCard);
formAddCard.addEventListener('submit', handleFormSubmitAddCard);