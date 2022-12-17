
const popupEditProfile = document.querySelector('.popup_form_edit');
const popupEditForm = popupEditProfile.querySelector('.popup__form');
const inputName = popupEditForm.querySelector('.popup__input_text_name');
const inputInfo = popupEditForm.querySelector('.popup__input_text_info'); 
// const popup = document.querySelector('.popup');
const popupEditClose = popupEditProfile.querySelector('.popup__btn-close');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__about');

// попап для добавления фото
const popupAddCard = document.querySelector('.popup_form_add');
const formAddCard = popupAddCard.querySelector('.popup__form');
const descriptionAddCard = popupAddCard.querySelector('.popup__input_text_name');
const linkAddCard = popupAddCard.querySelector('.popup__input_text_info');

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


// функция открытия любого попапа
function openPopup (popup) {
  popup.classList.add('popup_opened');
}

buttonEdit.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputInfo.value = profileInfo.textContent;
  openPopup(popupEditProfile);
})

buttonAdd.addEventListener('click', () => {
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
const cardsTemplate = document.querySelector('#card-template').content;

function createCard(name, link) {  
  //кланируем содержимое тега template
  const cardElement = cardsTemplate.querySelector('.element').cloneNode(true);
  // наполняем содержимым
  const cardLike = cardElement.querySelector('.element__like');
  const cardDelete = cardElement.querySelector('.element__delete');
  const cardImage = cardElement.querySelector('.element__img');
  
  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector('.element__title').textContent = name;
  

  cardLike.addEventListener('click', () => likeCard(cardLike));
  cardDelete.addEventListener('click', () => deleteCard(cardDelete));
  cardImage.addEventListener('click', () => {
    openPopup(popupViewer);
    fillPopupViewerData(name, link);
  });

  return cardElement;
}

function addCard(name, link) {
  cardsList.prepend(createCard(name, link));
}

// фукция добавления исходного массива карточек на страницу
function loadInitialCards(elements) {
  elements.reverse().forEach(({name, link}) => {
    console.log(name, link);
    addCard(name, link);
  })
}

loadInitialCards(initialCards);

function deleteCard(element) {
  element.closest('.element').remove();
}

// функция ставит лайк
function likeCard(like) {
  like.classList.toggle('element__like_active');
}

// функция закрывает окно попапа
function closePopup(item) {
  item.classList.remove('popup_opened');
}

popupCloseButtons.forEach(button => {
  button.addEventListener('click', () => {
    const popupParent = button.closest('.popup')
    closePopup(popupParent)
  })
})

//Обработчик формы Добавления карточки
function handleFormSubmitAddCard (evt) {
  evt.preventDefault();
  const name = descriptionAddCard.value;
  const link = linkAddCard.value;
 
  addCard(name, link);
  formAddCard.reset();
  closePopup(popupAddCard);
}

// Обработчик формы Редактирования профиля
function handleFormSubmitEditCard (evt) {
  evt.preventDefault();  
  profileName.textContent = inputName.value;;
  profileInfo.textContent = inputInfo.value;

  closePopup(popupEditProfile);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupEditForm.addEventListener('submit', handleFormSubmitEditCard);
formAddCard.addEventListener('submit', handleFormSubmitAddCard);