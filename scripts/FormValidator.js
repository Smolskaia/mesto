export class FormValidator {
  constructor (validationConfig, formElement) {
    this._validationConfig = validationConfig;
    // this._formSelector = validationConfig.formSelector;
    // this._inputSelector = validationConfig.inputSelector;
    // this._submitButtonSelector = validationConfig.submitButtonSelector;
    // this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    // this._inputErrorClass = validationConfig.inputErrorClass;
    // this._errorClass = validationConfig.errorClass;
    this._formElement = formElement;
    //находим список инпутов
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
    // делаем кнопку неактивной
    this._buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
  }


//ищем спан, получаем id элемента span, добавляем ему класс ошибки, добавляем ему текст ошибки
  _showInputError(inputElement, errorMessage) {
    // console.log('errorMessage =>', errorMessage)
    // находим спан
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    // добавляем ему класс, отвечающий за стили popup__input-error_active
    errorElement.classList.add(this._validationConfig.errorClass);
    //Установите validationMessage в качестве значения textContent для errorElement
    errorElement.textContent = errorMessage;
    //Добавьте errorElement класс inputErrorClass.
    inputElement.classList.add(this._validationConfig.inputErrorClass);
  }


// удаляем классы, стирая текс ошибки
  _hideInputError(inputElement) {
    // находим спан
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    
    errorElement.classList.remove(this._validationConfig.errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
  }

//Проверяем, есть ли у полей input свойство validity
  _checkInputValidity(inputElement) {
    
    if (inputElement.validity.valid) {
      // Если поле проходит валидацию, скроем ошибку
      this._hideInputError(inputElement);
    } else {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }

// метод, который проходит по всем инпутам и выявляет их валидность
  _hasInvalidInput() {
    /*если все инпуты валидны, метод возвращает фолс, если НЕвалиден хотябы один инпут в форме, 
    то возвращает тру. Метод some принимает на вход колбек функцию. 
    Параметром передаем элемент массива inputElement*/
      return this._inputList.some((inputElement) => !inputElement.validity.valid);
    }

// метод чтобы установить активное/неактивное состояние кнопки
// в параметры передаем список инпутов и конфиг
// список инпутов нужен для проверки каждого инпута на валидность
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      // console.log('hasInvalidInput!');
      this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      // console.log('NO hasInvalidInput!');
      this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

//метод передаем форму и конфиг
  _setEventListeners() {
    
    // вызываем функцию toggleButtonState чтобы при обновлении страницы обновлялось состояние кнопки
    this._toggleButtonState(this._inputList, this._buttonElement);

    // у каждой формы и навешиваем обработчики инпут
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        // вызываем функцию checkInputValidity, которая проверяет инпут на валидность
        this._checkInputValidity(inputElement);
        // вызываем функцию чтобы установить активное/неактивное состояние кнопки
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }

  //метод для очистки ошибок и управления кнопкой 
  resetValidation() {
    //управляем кнопкой
    this._toggleButtonState();
    //очищаем ошибки с инпутов
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement) 
    });

  }

  //метод для управления кнопкой
  // disableSubmitButton() {
  //   this._toggleButtonState()
  // }

// публичный метод enableValidation отвечает за включение валидации всех форм
  enableValidation() {
    this._setEventListeners();
  }

}