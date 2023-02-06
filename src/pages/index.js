import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';

import { validationConfig } from '../utils/validationConfig.js'
import { initialCards } from '../utils/initialCards.js';

import { Section } from '../components/Section.js';

import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';


// const popupList = document.querySelectorAll('.popup');
// попап для редактирования профия
const popupEditProfile = document.querySelector('.popup_form_edit');
const popupEditForm = popupEditProfile.querySelector('.popup__form');
const inputName = popupEditForm.querySelector('.popup__input_text_name');
const inputInfo = popupEditForm.querySelector('.popup__input_text_info'); 

// const popupEditClose = popupEditProfile.querySelector('.popup__btn-close');
// const profileName = document.querySelector('.profile__name');
// const profileInfo = document.querySelector('.profile__about');

// попап для добавления фото
const popupAddCard = document.querySelector('.popup_form_add');
const formAddCard = popupAddCard.querySelector('.popup__form');
// const descriptionAddCard = popupAddCard.querySelector('.popup__input_text_name');
// const linkAddCard = popupAddCard.querySelector('.popup__input_text_info');
// const btnAddCardSubmit = popupAddCard.querySelector('.popup__btn-save');

// попап для просмотра изображения
// const popupViewer = document.querySelector('.popup_form_viewer');
// const popupViewerContainer = popupViewer.querySelector('.popup__container-img');
// const popupViewerImage = popupViewer.querySelector('.popup__image');
// const popupViewerDescription = popupViewer.querySelector('.popup__description');

// Кнопки закрытия попапов
// const popupCloseButtons = document.querySelectorAll('.popup__btn-close');
// Кнопки открытия попапов
const buttonAdd = document.querySelector('.profile__btn-add');
const buttonEdit = document.querySelector('.profile__btn-edit');
// const popupOpenImg = document.querySelectorAll('.element__img');

// Массив инпутов
// const inputCardList = Array.from(popupAddCard.querySelectorAll('.popup__input'));


// Создаем экземпляр класса PopupWithImage:
const popupImage = new PopupWithImage('.popup_form_viewer');
// Вещаем на попап открытия картинки обработчик событий:
popupImage.setEventListeners();

// функция открытия попапа с картинкой
function openPopupImage(name, link) {
  popupImage.open(name, link);
}

// Находим контейнер в DOM, куда вставляем массив
const cardsList = document.querySelector('.elements__list');
// создаём элемент списка. Чтобы получить содержимое template, обращаемся к его свойству content
// const cardsTemplate = document.querySelector('#card-template').content;


const defaultCardList = new Section({ 
  items: initialCards, 
  renderer: (item) => {
    const card = new Card(item, '#card-template', openPopupImage);
    const cardElement = card.generateCard();
    // Вставим разметку на страницу,
    // используя метод addItem класса Section
    defaultCardList.addItem(cardElement)
  },
}, cardsList);

defaultCardList.renderItems();

//Для каждого попапа создаем свой экземпляр класса PopupWithForm
const popupEdit = new PopupWithForm('.popup_form_edit', handleEditFormSubmit);
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm('.popup_form_add', handleAddFormSubmit);
popupAdd.setEventListeners();

 
// коллбек формы добавления карточки
function handleAddFormSubmit() {

}
 //коллбек формы редактирования профиля
function handleEditFormSubmit(inputData) {
  user.setUserInfo(inputData);
  popupEdit.close();
}

const user = new UserInfo({
  profileNameSelector: '.profile__name', 
  profileInfoSelector: '.profile__about',
});



buttonEdit.addEventListener('click', () => {
  const { name, info } = user.getUserInfo();
  inputName.value = name;
  inputInfo.value = info;
  
  popupEdit.open();
    
})

buttonAdd.addEventListener('click', () => {
  validationFormAddCard.resetValidation();
  popupAdd.open();
})


// создаем экземпляры класса FormValidator
// для формы добавления карточки
const validationFormAddCard = new FormValidator(validationConfig, formAddCard);
validationFormAddCard.enableValidation();
// для формы редаутирования профиля
const validationFormEditCard = new FormValidator(validationConfig, popupEditForm);
validationFormEditCard.enableValidation();

// console.log('validationFormAddCard =>', validationFormAddCard);
// console.log('validationFormEditCard =>', validationFormEditCard);


// //Обработчик формы Добавления карточки
// function handleFormSubmitAddCard (evt) {
//   evt.preventDefault();
//   const data = {
//    name: descriptionAddCard.value,
//    link: linkAddCard.value
//   }
 
//   addCard(data);
//   formAddCard.reset();
//   closePopup(popupAddCard);
// }

// // Обработчик формы Редактирования профиля
// function handleFormSubmitEditCard (evt) {
//   evt.preventDefault();  
//   profileName.textContent = inputName.value;;
//   profileInfo.textContent = inputInfo.value;

//   popupEditForm.reset();

//   closePopup(popupEditProfile);
// }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
// popupEditForm.addEventListener('submit', handleFormSubmitEditCard);
// formAddCard.addEventListener('submit', handleFormSubmitAddCard);