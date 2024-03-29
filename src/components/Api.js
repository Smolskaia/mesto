export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  
  // проверка ответа сервера
_checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`)
}

  // загрузка карточек с сервера, метод GET по умолчанию
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(res => this._checkResponse(res));
  }

  // загрузка данных пользователя с сервера, метод GET по умолчанию
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(res => this._checkResponse(res));
  }

  // редактирование профиля методом PATCH
  setUserInfo(obj) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: obj.name,
        about: obj.info
      })
    })
    .then(res => this._checkResponse(res));
  }
  
  // добавление новой карточки, POST-запрос
  addNewCard(cardElement) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardElement.name,
        link: cardElement.link
      })
    })
    .then(res => this._checkResponse(res));
  }
  
  // поставить лайк, PUT-запрос
  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => this._checkResponse(res));
  }

  // убрать лайк, DELETE-запрос
  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._checkResponse(res));
  }

  // удаление карточки, DELETE-запрос
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._checkResponse(res));
  }

  // обновление аватара пользователя, PATCH-запрос
  setAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar : avatarLink
      })
    })
    .then(res => this._checkResponse(res));
  }

}



