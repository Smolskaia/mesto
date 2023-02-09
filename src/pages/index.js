import "./index.css";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";

import { validationConfig } from "../utils/validationConfig.js";
import { initialCards } from "../utils/initialCards.js";

import { Section } from "../components/Section.js";

import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

// форма попапа для редактирования профия
const popupEditForm = document.forms["form-edit"];

// форма попапа для добавления фото
const formAddCard = document.forms["form-add-card"];

// Кнопки открытия попапов
const buttonAdd = document.querySelector(".profile__btn-add");
const buttonEdit = document.querySelector(".profile__btn-edit");

// Находим контейнер в DOM, куда вставляем массив
const cardsList = document.querySelector(".elements__list");

//функция создает карточку и возвращает ее
function createCard(item) {
  const card = new Card(item, "#card-template", openPopupImage);
  const cardElement = card.generateCard();
  return cardElement;
}

const defaultCardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      // Вставим разметку на страницу,
      // используя метод addItem класса Section
      defaultCardList.addItem(cardElement);
    },
  },
  cardsList
);

defaultCardList.renderItems();

//Для каждого попапа создаем свой экземпляр класса PopupWithForm
const popupEdit = new PopupWithForm(".popup_form_edit", handleEditFormSubmit);
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm(".popup_form_add", handleAddFormSubmit);
popupAdd.setEventListeners();

// коллбек формы добавления карточки
function handleAddFormSubmit(item) {
  const cardElement = createCard(item);
  // Вставим разметку на страницу,
  // используя метод addItem класса Section
  defaultCardList.addItem(cardElement);
  popupAdd.close();
}

//коллбек формы редактирования профиля
function handleEditFormSubmit(inputData) {
  user.setUserInfo(inputData);
  popupEdit.close();
}

const user = new UserInfo({
  profileNameSelector: ".profile__name",
  profileInfoSelector: ".profile__about",
});

// Создаем экземпляр класса PopupWithImage:
const popupImage = new PopupWithImage(".popup_form_viewer");
// Вещаем на попап открытия картинки обработчик событий:
popupImage.setEventListeners();

// функция открытия попапа с картинкой
function openPopupImage(name, link) {
  popupImage.open(name, link);
}

// создаем экземпляры класса FormValidator
// для формы добавления карточки
const validationFormAddCard = new FormValidator(validationConfig, formAddCard);
validationFormAddCard.enableValidation();
// для формы редаутирования профиля
const validationFormEditCard = new FormValidator(
  validationConfig,
  popupEditForm
);
validationFormEditCard.enableValidation();

buttonEdit.addEventListener("click", () => {
  validationFormEditCard.resetValidation();
  popupEdit.open();
  popupEdit.setInputValues(user.getUserInfo());
});

buttonAdd.addEventListener("click", () => {
  validationFormAddCard.resetValidation();
  popupAdd.open();
});
