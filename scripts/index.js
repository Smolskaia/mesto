// Добавление массива карточек на страницу

// массив с карточками
let initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Находим форму в DOM, куда вставляем массив
const cardsList = document.querySelector('.elements__list');
// создаём элемент списка. Чтобы получить содержимое template, нужно обратиться к его свойству content
const cardsTemplate = document.querySelector('#card-template').content;


// функция для создания новой карточки
function createCard(name, link) {  
  //кланируем содержимое тега template
  const cardElement = cardsTemplate.querySelector('.element').cloneNode(true);
  // наполняем содержимым
  cardElement.querySelector('.element__img').src = link;
  cardElement.querySelector('.element__img').alt = `${name}.`;
  cardElement.querySelector('.element__title').textContent = name;
  
  const cardLike = cardElement.querySelector('.element__like');
  const cardDelete = cardElement.querySelector('.element__delete');
  const cardImage = cardElement.querySelector('.element__img');

  cardLike.addEventListener('click', () => likeCard(cardLike));
  cardDelete.addEventListener('click', () => deleteCard(cardDelete));
  cardImage.addEventListener('click', () => openViewerImgPopup(cardImage, name));

  cardsList.append(cardElement);
}

// фукция добавления исходного массива карточек на страницу
function loadInitialCards(elements) {
  elements.forEach(({name, link}) => {
    createCard(name, link);
  })
}

loadInitialCards(initialCards);

// функция удаления карточки
function deleteCard(element) {
  element.closest('.element').remove();
}

// функция переключает лайк
function likeCard(like) {
  like.classList.toggle('element__like_active');
}
 //__________________________________________________

// попап для просмотра изображения
const popupViewer = document.querySelector('.popup_viewer');
const popupViewerImage = popupViewer.querySelector('.popup__image');
const popupViewerDescription = popupViewer.querySelector('.popup__description');

 // функция открытия попапа с изображением
function openViewerImgPopup (image, title) {
  openPopup(popupViewer);

  popupViewerImage.src = image.src;
  popupViewerImage.alt = `${title}.`;
  popupViewerDescription.textContent = title;
}
//_______________________________________________

// попап для добавления фото
const popupAddCard = document.querySelector('.popup_form_add');
const formAddCard = popupAddCard.querySelector('.popup__form');
const descriptionAddCard = popupAddCard.querySelector('.popup__input_text_name');
const linkAddCard = popupAddCard.querySelector('.popup__input_text_info');

function handleFormSubmitAddCard (evt) {
  evt.preventDefault();
  const name = descriptionAddCard.value;
  const link = linkAddCard.value;

  createCard(name, link);
  closePopup(popupAddCard);
}



// Кнопка закрытия попапов
const popupAddCardClose = popupAddCard.querySelector('.popup__btn-close');
// Все кнопки открытия попапов
const buttonAdd = document.querySelector('.profile__btn-add');
const buttonEdit = document.querySelector('.profile__btn-edit');
const popupOpenImg = document.querySelectorAll('.element__img');


// функция открытия любого попапа
function openPopup (item) {
  item.classList.add('popup_opend');
}

const popupCloseButtons = document.querySelectorAll('.popup__btn-close');
popupCloseButtons.forEach(button => {
  button.addEventListener('click', () => {
    const popupParent = button.closest('.popup')
    closePopup(popupParent)
  } )
})

// popupAddCardClose.addEventListener('click',() => {
//   closePopup(popupAddCard)
// } )

// popupEditClose.addEventListener('click',() => {
//   closePopup(popupEditForm)
// } )
// функция открытия попапа добавления фото
function openAddPopup () {
  popupAddCard.classList.add('popup_opened');
}

// вешаем обработчик на клик по кнопке, в скобках (событие, функция)
buttonAdd.addEventListener('click', openAddPopup) 

// Находим форму в DOM
const popupForm = document.querySelector('.popup__form');
// Находим поля формы в DOM
const inputName = popupForm.querySelector('.popup__input_text_name');
const inputInfo = popupForm.querySelector('.popup__input_text_info'); 
// Открытие/закрытие попап

const popup = document.querySelector('.popup');
const popupEditForm = document.querySelector('.popup_form_edit');

const popupEditClose = popupEditForm.querySelector('.popup__btn-close');
// Выберите элементы, куда должны быть вставлены значения полей
let profileName = document.querySelector('.profile__name');
let profileInfo = document.querySelector('.profile__about');

// функция открытия попапа редактирования профиля
function openEditPopup() {
  //вставляем значения со страницы в поля с помощью textContent
  inputName.value = profileName.textContent;
  inputInfo.value = profileInfo.textContent;
  // popup.classList.add('popup_opened');
  popupEditForm.classList.add('popup_opened');
}

// вешаем обработчик на клик по кнопке, в скобках (событие, функция)
buttonEdit.addEventListener('click', openEditPopup) 


// функция закрывает окно попапа
function closePopup(item) {
  item.classList.remove('popup_opened');

}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.
    // Получите значение полей jobInput и nameInput из свойства value
    // Вставьте новые значения на страцицу из формы с помощью textContent    
  profileName.textContent = inputName.value;;
  profileInfo.textContent = inputInfo.value;

  closePopup(popupEditForm);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupForm.addEventListener('submit', handleFormSubmit);