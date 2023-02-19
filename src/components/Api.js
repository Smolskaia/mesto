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

  // загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(res => this._checkResponse(res));
  }

  // другие методы работы с API




}

// // загрузка карточек с сервера
// export const getInitialCards = () => {
//   return fetch('https://mesto.nomoreparties.co/v1/cohort-60/cards', {
//   headers: {
//     authorization: '75431e8b-c938-443f-8b20-ed39d4658e75'
//   }
// })
// // .then(res => res.ok ? res.json() : Promise.reject())
// .then((res) => { 
//   if (res.ok) {
//     return res.json();
//   }
//   // если ошибка, отклоняем промис
//   return Promise.reject(`Ошибка: ${res.status}`)
// })

// }

// export const deleteCard = () => {
//   return fetch('https://mesto.nomoreparties.co/v1/cohort-60/cards', {
//   headers: {
//     authorization: '75431e8b-c938-443f-8b20-ed39d4658e75'
//   }
// })
// // .then(res => res.ok ? res.json() : Promise.reject())
// .then((res) => { 
//   if (res.ok) {
//     return res.json();
//   }
//   // если ошибка, отклоняем промис
//   return Promise.reject(`Ошибка: ${res.status}`)
// })

// }




