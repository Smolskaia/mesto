import "./index.css";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";

import { validationConfig } from "../utils/validationConfig.js";
import { initialCards } from "../utils/initialCards.js";

import { Section } from "../components/Section.js";

import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

import { apiConfig } from "../utils/apiConfig.js";
import { Api } from "../components/Api.js";

// форма попапа для редактирования профия
const popupEditForm = document.forms["form-edit"];

// форма попапа для добавления фото
const formAddCard = document.forms["form-add-card"];

//форма папапа обновления аватара
const formSetAvatar = document.forms["form-update-avatar"];

//аватар
const profileAvatar = document.querySelector('.profile__avatar');

// Кнопки открытия попапов
const buttonAdd = document.querySelector(".profile__btn-add");
const buttonEdit = document.querySelector(".profile__btn-edit");
const buttonSetAvatar = document.querySelector(".profile__btn-edit-avatar")

// Находим контейнер в DOM, куда вставляем массив
const cardsList = document.querySelector(".elements__list");

// экземпрляр класса Api
const api = new Api(apiConfig); 

//функция создает карточку и возвращает ее
function createCard(item) {
  const card = new Card(item, "#card-template", openPopupImage);
  const cardElement = card.generateCard();
  return cardElement;
}

// function handleDeleteClick() {
//   api.deleteCard(card.getId)
//   .then(() => {
//     card.deleteCard()
//   })
// }

//вывод исходного массива с сервера
api.getInitialCards()
.then(res => {
  // console.log('res =>', res)
  defaultCardList.renderItems(res);
})
.catch((err) => {
  console.log(err); // выведем ошибку в консоль
}); 

//вывод данных полльзователя с сервера
api.getUserInfo()
.then(res => {
  // console.log('res =>', res)
  user.setUserInfo(res);
})
.catch((err) => {
  console.log(err); // выведем ошибку в консоль
}); 

// нужно вызвать промис олл, чтобы сперва загрузилась информация о пользователе(с id), а затем массив карточек с сервера.
//
// Promise.all([api.getUserInfo(), api.getInitialCards()])


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

// defaultCardList.renderItems();

//Для каждого попапа создаем свой экземпляр класса PopupWithForm
const popupEdit = new PopupWithForm(".popup_form_edit", handleEditFormSubmit);
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm(".popup_form_add", handleAddFormSubmit);
popupAdd.setEventListeners();

const popupSetAvatar = new  PopupWithForm(".popup_form_update-avatar", handleSetAvatarFormSubmit);
popupSetAvatar.setEventListeners();

// коллбек формы добавления карточки
function handleAddFormSubmit(cardElement) {
  popupAdd.setButtonText('Сохранение...');
  api.addNewCard(cardElement)
  .then(res => {
    // console.log('addNewCard =>', res);
    defaultCardList.addItem(createCard(res));
    popupAdd.close();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })
  .finally(() => {
    popupAdd.setButtonText('Создать');
  })
}

//коллбек формы редактирования профиля
function handleEditFormSubmit(inputData) {
  popupEdit.setButtonText('Сохранение...');
  api.setUserInfo(inputData)
  .then(res => {
    console.log('setUserInfo =>', res);
    user.setUserInfo(res);
    popupEdit.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupEdit.setButtonText('Сохранить');
  })
}

//коллбек формы обновления аватара
function handleSetAvatarFormSubmit(avatarLink) {
popupSetAvatar.setButtonText('Сохранение...');
  api.setAvatar(avatarLink.link)
  .then(res => {
    console.log('setAvatar =>', res);
    user.setUserInfo(res);
    popupSetAvatar.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupSetAvatar.setButtonText('Сохранить');
  })
}
  

const user = new UserInfo({
  profileNameSelector: ".profile__name",
  profileInfoSelector: ".profile__about",
  profileAvatarSelector: ".profile__avatar"
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

// для формы обновления аватара
const validationFormSetAvatar = new FormValidator(validationConfig, formSetAvatar);
validationFormSetAvatar.enableValidation();

buttonEdit.addEventListener("click", () => {
  validationFormEditCard.resetValidation();
  popupEdit.open();
  popupEdit.setInputValues(user.getUserInfo());
});

buttonAdd.addEventListener("click", () => {
  validationFormAddCard.resetValidation();
  popupAdd.open();
});

buttonSetAvatar.addEventListener("click", () => {
  validationFormSetAvatar.resetValidation();
  popupSetAvatar.open();
});
