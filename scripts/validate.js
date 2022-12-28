
// появление сообщения об ошибке в одну или две строки высотой не должно приводить к изменению
// высоты модального окна. Если сообщение об ошибке от трёх строк высотой, то размер модального окна
// увеличивается.
// Модальное окно не закрывается, если кликнуть внутри него — по самóй форме, а не по оверлею.
// Слушатель событий, закрывающий модальное окно по нажатию на Esc , добавляется при открытии модального
// окна и удаляется при его закрытии.

// в validate.js
// объект, состоящий из свойств
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}; 


//ищем спан, получаем id элемента span, добавляем ему класс ошибки, добавляем ему текст ошибки
function showInputError(formElement, inputElement, validationConfig) {
  // находим спан
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // добавляем ему класс, отвечающий за стили popup__input-error_active
  errorElement.classList.add(validationConfig.errorClass);
  //Установите validationMessage в качестве значения textContent для errorElement
  errorElement.textContent = inputElement.validationMessage;
  //Добавьте errorElement класс inputErrorClass.
  inputElement.classList.add(validationConfig.inputErrorClass);
}

// функция удаляет классы, стирая текс ошибки
function hideInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(validationConfig.inputErrorClass);
}

//Проверяем, есть ли у полей input свойство validity
function checkInputValidity(formElement, inputElement, validationConfig) {
  
  if (inputElement.validity.valid) {
    // Если поле проходит валидацию, скроем ошибку
    hideInputError(formElement, inputElement, validationConfig);
  } else {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, validationConfig);
  }
}

// функция, которая проходит по всем инпутам и выявляет их валидность
function hasInvalidInput(inputList) {
/*если все инпуты валидны, функция возвращает фолс, если НЕвалиден хотябы один инпут в форме, 
то возвращает тру. Метод some принимает на вход колбек функцию. 
Параметром передаем элемент массива inputElement*/
  return inputList.some((inputElement) => !inputElement.validity.valid);
}


// функция чтобы установить активное/неактивное состояние кнопки
// в параметры передаем список инпутов и конфиг
// список инпутов нужен для проверки каждого инпута на валидность
function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

//в функцию передаем форму и конфиг
function setEventListeners(formElement, validationConfig) {
  //находим список инпутов
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  // делаем кнопку неактивной
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  // вызываем функцию toggleButtonState чтобы при обновлении страницы
  toggleButtonState(inputList, buttonElement, validationConfig);

  // у каждой формы и навешиваем обработчики инпут
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      // вызываем функцию checkInputValidity, которая проверяет инпут на валидность
      checkInputValidity(formElement, inputElement, validationConfig);
      // вызываем функцию чтобы установить активное/неактивное состояние кнопки
      toggleButtonState(inputList, buttonElement, validationConfig);
    })
  })
}

// функция enableValidation отвечает за включение валидации всех форм,
//  принимает на вход объект параметров validationConfig, а затем
// передаёт параметры вложенным функциям;
function enableValidation(validationConfig) {
  // получаем все формы
  const formList =Array.from(document.querySelectorAll(validationConfig.formSelector));
// проходимся по каждой форме, вызываем обработчик событий
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  })
}

enableValidation(validationConfig);