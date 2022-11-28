// сохраняем ссылки на нужные элементы в переменные JS
const editButton = document.querySelector('.profile__btn-edit');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__btn-close');


// вешаем обработчик на клик по кнопке, в скобках пишем (событие, функция)
editButton.addEventListener('click', openEditPopup) 
popupClose.addEventListener('click', closeEditPopup)

// функция открытия попапа
function openEditPopup() {
  popup.classList.add('popup_opened');
}
// функция удаляет окно открытого попапа
function closeEditPopup() {
  popup.classList.remove('popup_opened');
}






console.log({editButton, popup, popupClose});