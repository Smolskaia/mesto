/* ## Создайте класс `UserInfo`

Класс `UserInfo` отвечает за управление отображением информации о пользователе на странице. 
Этот класс:

- Принимает в конструктор объект с селекторами двух элементов: 
элемента имени пользователя и элемента информации о себе.
- Содержит публичный метод `getUserInfo`, который возвращает 
объект с данными пользователя. Этот метод пригодится когда 
данные пользователя нужно будет подставить в форму при открытии.
- Содержит публичный метод `setUserInfo,` который принимает новые 
данные пользователя и добавляет их на страницу. */

export class UserInfo {
  constructor({profileNameSelector, profileInfoSelector}) {
    this._name = document.querySelector(profileNameSelector);
    this._info = document.querySelector(profileInfoSelector);
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      info: this._info.textContent,
    }
    return userData;
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(inputData) {
    this._name.textContent = inputData.name;
    this._info.textContent = inputData.about;
    // console.log(inputData);
  }
}