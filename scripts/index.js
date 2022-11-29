// проверяем, что скрипт подключел верно, в консоли отображаются все перечисленные элементы
// console.log('Hello');

// Находим форму в DOM
let popupContainer = document.querySelector('.popup__container');
// Находим поля формы в DOM
let InputName = popupContainer.querySelector('.popup__input-text_name');
let InputInfo = popupContainer.querySelector('.popup__input-text_info'); 
// Открытие/закрытие попап
let editButton = document.querySelector('.profile__btn-edit');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__btn-close');
// Выберите элементы, куда должны быть вставлены значения полей
let profileName = document.querySelector('.profile__name');
let profileInfo = document.querySelector('.profile__about');

// функция открытия попапа
function openEditPopup() {
  //вставляем новые значения в поля с помощью textContent
  InputName.value = profileName.textContent;
  InputInfo.value = profileInfo.textContent;
  popup.classList.add('popup_opened');
}

// функция закрывает окно попапа
function closeEditPopup() {
  popup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.
    // Получите значение полей jobInput и nameInput из свойства value
  let nameFormValue = InputName.value;
  let infoFormValue = InputInfo.value;
    
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameFormValue;
  profileInfo.textContent = infoFormValue;

  closeEditPopup();
}

// вешаем обработчик на клик по кнопке, в скобках (событие, функция)
editButton.addEventListener('click', openEditPopup) 
popupClose.addEventListener('click', closeEditPopup)


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupContainer.addEventListener('submit', handleFormSubmit);