// проверяем, что скрипт подключел верно, в консоли отображаются все перечисленные элементы
// console.log('Hello');

// Находим форму в DOM
const popupForm = document.querySelector('.popup__input');
// Находим поля формы в DOM
const inputName = popupForm.querySelector('.popup__input-text_name');
const inputInfo = popupForm.querySelector('.popup__input-text_info'); 
// Открытие/закрытие попап
const buttonEdit = document.querySelector('.profile__btn-edit');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__btn-close');
// Выберите элементы, куда должны быть вставлены значения полей
let profileName = document.querySelector('.profile__name');
let profileInfo = document.querySelector('.profile__about');

// функция открытия попапа
function openEditPopup() {
  //вставляем значения со страницы в поля с помощью textContent
  inputName.value = profileName.textContent;
  inputInfo.value = profileInfo.textContent;
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
    // Вставьте новые значения на страцицу из формы с помощью textContent    
  profileName.textContent = inputName.value;;
  profileInfo.textContent = inputInfo.value;

  closeEditPopup();
}

// вешаем обработчик на клик по кнопке, в скобках (событие, функция)
buttonEdit.addEventListener('click', openEditPopup) 
popupClose.addEventListener('click', closeEditPopup)


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupForm.addEventListener('submit', handleFormSubmit);