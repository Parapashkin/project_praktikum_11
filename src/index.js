import { Api } from './modules/API.js';
import { Card } from './modules/Card.js';
import { CardList } from './modules/CardList.js';
import { Popup } from './modules/Popup.js';
import { UserInfo } from './modules/UserInfo.js';
import { FormValidator } from './modules/FormValidator.js';

import "./pages/index.css";



const markup = `
    <div class="place-card">
        <div class="place-card__image" style="background-image: url(https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg)">
          <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
          <h3 class="place-card__name">Камчатка</h3>
          <div class= "place-card__like-count-container">
          <button class="place-card__like-icon"></button>
          <p class="place-card__like-count">1</p>
          <div>
        </div>
      </div>`;



const list = document.querySelector('.places-list');

const edit = document.querySelector("#edit");
const content = document.querySelector("#content");
const image = document.querySelector("#image");


const userInfoButtonEdit = document.querySelector('.user-info__button-edit');
const popupButtonEdit = document.querySelector('.popup__button-edit');
const userInfoButton = document.querySelector('.user-info__button');


const formPopup = document.querySelector('form[name="popup"]');
const formEdit = document.querySelector('form[name="edit"]');
const userInfoPhoto = document.querySelector(".user-info__photo");
const userName = document.querySelector('.user-info__name');
const userInfoJob = document.querySelector('.user-info__job');



const config = {
  url: 'https://praktikum.tk/cohort11',
  headers: {
    authorization: '3b68f79d-8904-4383-b159-e36d5c19e502',
    'Content-Type': 'application/json'
  },
  requests: ["users/me", "cards"]
};




function createCard(cardName, cadrLink, likes) {
  const card = new Card(cardName, cadrLink, markup, imageOpen, likes);
  return card.create();

}

const api = new Api(config)
const cardList = new CardList(list, createCard, api);



api.getUserData(userName, userInfoJob, userInfoPhoto)
  .then((result) => {
    userName.textContent = result.name;
    userInfoJob.textContent = result.about;
    userInfoPhoto.style = `background-image: url(${result.avatar})`;
  })
  .catch((error) => {
    console.log(error);
  });

api.getInitialCards()
  .then(cards => cardList.render(cards))
  .catch((error) => {
    console.log(error);
  });


const formPopupValidator = new FormValidator(formPopup);
const formEditValidator = new FormValidator(formEdit);


function defaultValues(name, info) {
  formEdit.name.value = name;
  formEdit.info.value = info;
}


const userInfo = new UserInfo(userName, userInfoJob, defaultValues);

const editPop = new Popup(edit);
const imagePop = new Popup(image);
const contentPop = new Popup(content);

formEdit.addEventListener('submit', (event) => {
  event.preventDefault();
  const { name, info } = formEdit.elements;
  api.changeUserInfo(name.value, info.value)
    .then(() => { userInfo.setUserInfo(name.value, info.value); })
    .then(() => { editPop.close(); })
    .then(() => { formEdit.reset(); })
    .catch((error) => {
      alert("Ошибка " + error);
    })

});



editPop.setEventListeners();
userInfoButtonEdit.addEventListener('click', () => {
  formEditValidator.cleanSpaces();
  popupButtonEdit.disabled ? popupButtonEdit.disabled = false : false;
  userInfo.setUserInfo(userName.textContent, userInfoJob.textContent);
  editPop.open();

})




imagePop.setEventListeners();
function imageOpen(picture) {
  document.querySelector('.popup__image').setAttribute('style', `${picture}`);
  imagePop.open();
}

contentPop.setEventListeners();
userInfoButton.addEventListener('click', () => {
  formPopupValidator.cleanSpaces();
  contentPop.open();

});


formPopup.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = document.forms.popup;
  const { place, link } = form.elements;
  const cardList = new CardList(list, createCard);
  api.postNewCards(place.value, link.value)
    .then(() => { cardList.addCard(place.value, link.value); })
    .then(() => { contentPop.close(); })
    .then(() => { form.reset(); })
    // .then(cardList.addCard(place.value, link.value))
    .catch((error) => {
      console.log(error);
    })
  // content.classList.remove('popup_is-opened');
  // form.reset();
})



formEditValidator.setEventListeners();
formPopupValidator.setEventListeners();




/**
 * Удалил исправленные замечания
 * Работа принята, но обязательно замените в FormValidator let на const. ++++
 * Желаю успехов! ++++)
 */


/*REVIEW. Резюме.

Что надо исправить.

Ошибки прошлых спринтов, которые надо исправить. +++

1. Форма карточки открывается с активной кнопкой сабмита, чего не должно быть, так как форма должна быть очищена при открытии.

Валидацию формы карточки нужно сделать либо в полном объёме (по дополнительному пункту из задания 7), либо валидацию
в соответствии только с обязательным требованием. Если делать валидацию в соответствии только с обязательным требованием, сообщения об ошибках
на форме карточки не должны высвечиваться, а валидация должна заключаться в том, что нужно сделать так, чтобы кнопка сабмита этой формы была
заблокирована, если хотя бы одно из полей форм пустое, и была разблокирована,
если в обоих полях есть какая-то информация (любая), то есть оба поля непустые, также поля формы должны быть всегда пустыми при её открытии.
Либо нужно полностью правильно сделать валидацию этой формы по дополнительному пункту из задания 7, основываясь на описании этого
пункта и видео, при этом надо учитывать, что при открытии формы карточки её поля ввода должны быть пусты, не должно быть видно сообщений об ошибках
и кнопка сабмита должна быть неактивной.


2. Валидация формы профиля была совершенно правильной в 7-м задании. Нужно восстановить валидацию по требованиям ревью из 7-го задания.
Сейчас при валидации происходит много ошибок, одна из них на снимке "profile_form.png" в корне Вашего проекта (на снимке видно, что не
происходит никакой реакции приложения, когда в поле ввода стёрта информация).


Ошибки текущего спринта, которые надо исправить.

1. При открытии формы профиля происходит обращение к серверу, чего быть не должно. +++

2. Сейчас невозможно удалить карточку, даже только что введённую пользователем из формы профиля.
Если Вы не доделали удаление карточки при взаимодействии с сервером, на ревью надо прислать вариант работы с удалением карточки без обращения
к серверу, как было в прошлых спринтах, то есть без дополнительных заданий, но чтобы весь обязательный функционал работал.+++

3. Нужно преобразовать структуру методов класса Api (подробный комментарий и образец в файле класса Api). +++

4. Нужно обрабатывать ответ сервера при запросе из метода this.api.changeUserInfo (подробные комментарии в файле класса UserInfo).


__________________________________________________________________________________________________________________________________
/*REVIEW2. Резюме2.

Проект стал гораздо лучше.

Но, надо учесть ещё некоторые нюансы (ну, для этого, ведь, мы и учимся!)

Что надо исправить.

1. Аргументом метода then должна быть коллбэк функция, которая выполняется не сразу, а асинхронно, только
после прихода ответа от сервера, а не вызов функции (подробный комментарий в этом файле в слушателе события сабмита формы профиля).

2. Для закрытия формы профиля нужно вызывать метод класса Popup close(),а не дублировать его код (подробный комментарий в этом файле
в слушателе события сабмита формы профиля).

3. Инструкцию  очистки формы профиля formEdit.reset() нужно поместить в последний метод then, или вообще убрать (подробный комментарий в этом файле
в слушателе события сабмита формы профиля).


__________________________________________________________________________________________________________________________________
/*REVIEW3. Резюме3.

Вы хорошо поработали над проектом.

Задание принимается.

Желаю успехов в дальнейшем обучении!

*/