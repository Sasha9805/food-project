"use strict";

import { openModal, closeModal } from "./modal";
import { postData } from "../services/services";

function forms(modalTimerId) {
  // Forms

  const forms = document.forms;
  // Для блока после формы - состояние запроса для пользователя
  const message = {
    // loading: 'Загрузка',
    loading: 'img/form/spinner.svg',
    success: 'Спасибо, скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так'
  };

  for (let form of forms) {
    bindPostData(form);
  }

  function bindPostData(form) {
    form.addEventListener('submit', event => {
      event.preventDefault();

      // const statusMessage = document.createElement('div');
      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      // Уст. по центру (лучше через css классы)
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      // statusMessage.textContent = message.loading;
      // form.append(statusMessage);
      // Чтобы форма не уменьшалась при появлении спиннера
      form.after(statusMessage);

      // const request = new XMLHttpRequest();
      // request.open('POST', '/server.php');
      // Заголовок, используя FormData
      // Такой заголовок не сработает!!! (будет пустой ответ) + нужна последняя версия PHP, иначе - ошибка
      // См. вкладку Network в devtools
      // request.setRequestHeader('Content-type', 'multipart/form-data');

      // Передадим данные с пом. объекта FormData
      const formData = new FormData(form);

      // Но, напр., нам нужно передать в формате JSON
      // request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      // Нужно преобр. FormData в JSON
      // const obj = {};
      // formData.forEach((value, key) => {
      //   obj[key] = value;
      // });
      // // Конвертируем в JSON
      // const json = JSON.stringify(obj);

      // Преобразуем по-другому
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      // Отправим
      // request.send(formData);
      // Как JSON
      // request.send(json);

      // FETCH
      // При server1.php все равно промис будет успешно выполнен
      // Для fetch важно, что сам запрос вообще удалось сделать
      // А если это ошибка HTTP, то промис не перейдет в состояние reject
      // При server1 - 404 (запрашиваемый ресурс не найден)
      // Если в Network поставить offline, то catch сработает
      // fetch('/server.php', {
      //   method: 'POST',
      //   headers: {
      //     'Content-type': 'application/json'
      //   },
      //   // Для FormData заголовки не нужны!
      //   // body: formData
      //   body: json
      // })
      // // response.json() - сработает catch, а от сервера получим NULL
      // .then(response => response.text())
      postData('http://localhost:3000/requests', json)
        .then(data => {
          console.log(data);
          showThanksModal(message.success);
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
          statusMessage.remove();
        });

      // request.addEventListener('load', () => {
      //   if (request.status == 200) {
      //     console.log(request.response);
      //     // statusMessage.textContent = message.success;
      //     showThanksModal(message.success);
      //     // Очистим форму и удалим блок с сообщением
      //     form.reset();
      //     // Это уже не нужно
      //     // setTimeout(() => {
      //     //   statusMessage.remove();
      //     // }, 2000);
      //     statusMessage.remove();
      //   } else {
      //     // statusMessage.textContent = message.failure;
      //     showThanksModal(message.failure);
      //     form.reset();
      //     statusMessage.remove();
      //   }
      // });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    // Нужно скрывать, а не удалять, чтобы в дальнейшем пользоваться изначальным функционалом
    prevModalDialog.classList.add('hide');
    // Заново открываем
    openModal('.modal', modalTimerId);

    // Формируем новое modal__dialog
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    // Чтоб крестик работал, нужно применить делегирование к modal
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    // Помещаем в div.modal
    // modal.append(thanksModal);
    document.querySelector('.modal').append(thanksModal);

    // Через время новое мод. окно должно пропасть и появиться старое
    // Напр., польз. заново захочет отпр. свои данные, а там должна быть форма
    setTimeout(() => {
      thanksModal.remove();
      // prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal('.modal');
    }, 4000);
  }

  // GET-запрос fetch
  // fetch('https://jsonplaceholder.typicode.com/todos/1')
  //   .then(response => response.json())
  //   .then(json => console.log(json));

  // POST
  // fetch('https://jsonplaceholder.typicode.com/posts', {
  //   method: 'POST',
  //   body: JSON.stringify({name: 'John'}),
  //   headers: {
  //     'Content-type': 'application/json'
  //   }
  // })
  //   .then(response => response.json())
  //   .then(json => console.log(json));

  // Попробуем получить доступ к db.json
  // fetch('db.json')
  // // fetch('http://localhost:3000/menu')
  //   .then(response => response.json())
  //   .then(data => console.log(data));
}

// module.exports = forms;
export default forms;