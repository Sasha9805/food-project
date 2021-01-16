/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


function calc() {
  // Calculator

  const result = document.querySelector('.calculating__result span');
  let sex, height, weight, age, ratio;

  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', sex);
  }

  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', ratio);
  }

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.classList.remove(activeClass);

      if (elem.id == localStorage.getItem('sex')) {
        elem.classList.add(activeClass);
      }

      if (elem.dataset.ratio == localStorage.getItem('ratio')) {
        elem.classList.add(activeClass);
      }
    });
  }

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '____';
      return;
    }

    if (sex == 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }

  calcTotal();

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    // При замене parentSelector на selector, нужно учитывать это здесь
    // document.querySelector(selector).addEventListener('click', function(event) {
    //   // Мое решение (не нужно исп. ф-ю-стрелку из-за this)
    //   // console.log(this);
    //   if (this == event.target) {
    //     return;
    //   }

    //   if (event.target.dataset.ratio) {
    //     ratio = +event.target.dataset.ratio;
    //     localStorage.setItem('ratio', ratio);
    //   } else {
    //     sex = event.target.id;
    //     localStorage.setItem('sex', sex);
    //   }

    //   console.log(sex);
    //   console.log(ratio);

    //   elements.forEach(item => {
    //     item.classList.remove(activeClass);
    //   });
    //   event.target.classList.add(activeClass);

    //   calcTotal();
    // });

    // С урока
    elements.forEach(elem => {
      elem.addEventListener('click', event => {
        if (event.target.dataset.ratio) {
          ratio = +event.target.dataset.ratio;
          localStorage.setItem('ratio', ratio);
        } else {
          sex = event.target.id;
          localStorage.setItem('sex', sex);
        }

        // console.log(sex);
        // console.log(ratio);

        elements.forEach(item => {
          item.classList.remove(activeClass);
        });
        event.target.classList.add(activeClass);

        calcTotal();
      });
    });
  }

  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = '';
      }

      switch (input.id) {
        case 'height':
          height = +input.value;
          break;

        case 'weight':
          weight = +input.value;
          break;

        case 'age':
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }

  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
}

// module.exports = calc;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");




function cards() {
  // Используем классы для карточек
  class MenuCard {
    // Syntax Error. Rest параметр не поддерживает п-ры по умолчанию!
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      // Но [] в логическом контексте true
      // this.classes = classes || ['menu__item'];
      // Будем проверять длину массива classes
      this.classes = (classes.length == 0) ? ['menu__item'] : classes;
      this.parent = document.querySelector(parentSelector);
      // Курс валют
      this.transfer = 27;
      // Вызовем его в конструторе
      this.changeToUAH();
    }
    // Из БД приходит цена в долларах, а на сайте в гривнах
    changeToUAH() {
      this.price *= this.transfer;
    }
    render() {
      const element = document.createElement('div');
      // С урока
      // if (this.classes.length == 0) {
      //   this.element = 'menu__item';
      //   element.classList.add(this.element);
      // } else {
      //   this.classes.forEach(item => element.classList.add(item));
      // }
      this.classes.forEach(item => element.classList.add(item));
      element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;
      this.parent.append(element);
    }
  }

  // Воспользуемся данными из db.json

  // getResource('http://localhost:3000/menu')
  //   // Мое решение
  //   .then(data => {
  //     data.forEach(obj => {
  //       new MenuCard(...Object.values(obj), '.menu .container').render();
  //     });
  //   })
  //   .catch(err => console.log(err));
  //   // С урока
  //   // .then(data => {
  //   //   data.forEach(({img, altimg, title, descr, price}) => {
  //   //     new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
  //   //   });
  //   // });

  // Библиотека axios
  axios.get('http://localhost:3000/menu')
    .then(cards => {
      cards.data.forEach(obj => {
        new MenuCard(...Object.values(obj), '.menu .container').render();
      });
    });
  // Объект {data: [{}, {}, {}], status: 200, ...}
  // .then(data => console.log(data));

  // Еще один вариант (вместо класса)
  // function createCard(data) {
  //   data.forEach(({img, altimg, title, descr, price}) => {
  //     const elem = document.createElement('div');
  //     elem.classList.add('menu__item');

  //     elem.innerHTML = `
  //       <img src=${img} alt=${altimg}>
  //       <h3 class="menu__item-subtitle">${title}</h3>
  //       <div class="menu__item-descr">${descr}</div>
  //       <div class="menu__item-divider"></div>
  //       <div class="menu__item-price">
  //           <div class="menu__item-cost">Цена:</div>
  //           <div class="menu__item-total"><span>${price}</span> грн/день</div>
  //       </div>
  //     `;

  //     document.querySelector('.menu .container').append(elem);
  //   });
  // }

  // getResource('http://localhost:3000/menu')
  //   .then(data => createCard(data))
  //   .catch(err => console.log(err));

  // Вызываем
  // new MenuCard(
  //   "img/tabs/vegy.jpg",
  //   "vegy",
  //   'Меню "Фитнес"',
  //   'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  //   9,
  //   '.menu .container',
  //   // 'menu__item'
  // ).render();

  // new MenuCard(
  //   "img/tabs/elite.jpg",
  //   "elite",
  //   'Меню “Премиум”',
  //   'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
  //   21,
  //   '.menu .container',
  //   'menu__item',
  //   'big'
  // ).render();

  // new MenuCard(
  //   "img/tabs/post.jpg",
  //   "post",
  //   'Меню "Постное"',
  //   'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
  //   14,
  //   '.menu .container',
  //   'menu__item'
  // ).render();
}

// module.exports = cards;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");





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
      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
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
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

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
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "openModal": () => /* binding */ openModal,
/* harmony export */   "closeModal": () => /* binding */ closeModal
/* harmony export */ });


function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('show');
  modal.classList.remove('hide');
  // Можно исп. toggle
  // modal.classList.toggle('show');

  document.body.style.overflow = 'hidden';

  // Чтобы не открывалось по таймеру, если польз. открыл вручную
  // console.log(modalTimerId);
  if (modalTimerId) {
    clearTimeout(modalTimerId);
  }

  // Чтобы при срабатывании таймера не сработало открытие при докрутке
  // e - undefined
  // e - параметр для закрытия мод. окна в зависимости от условий (исп. в изначальной версии)
  // Нужно при раскомментировании убрать remove... в ф-и showModalByScroll
  // if (!e) {
  //   window.removeEventListener('scroll', showModalByScroll);
  // }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('hide');
  modal.classList.remove('show');
  // Можно исп. toggle
  // modal.classList.toggle('show');

  document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  // Modal

  const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

  modalTrigger.forEach(item => {
    item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  });

  // Закрытие по клику на "подложку"
  modal.addEventListener('click', e => {
    // Мой вариант
    // if (e.target.classList.contains('modal')) {
    // В уроке
    // Бывает, не передают объект события, а
    // обращаются к event.target..
    // Так делать НЕ НАДО
    // if (event.target == modal) {
    // Мой вариант
    // if (e.target == modal || e.target.dataset.close != undefined) {
    // С урока
    if (e.target == modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });

  // Закрытие по клику на esc
  document.addEventListener('keydown', e => {
    if (e.code == 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });

  // Мод. окно откроется через какое-то время
  // Перенесли в script.js, далее передаем как аргумент
  // const modalTimerId = setTimeout(openModal, 7000);

  // Мод.окно откр. при докрутке до конца
  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
  window.addEventListener('scroll', showModalByScroll);
}

// module.exports = modal;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
  // Slider

  const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.getElementById(totalCounter),
        current = document.getElementById(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        // width = parseInt(getComputedStyle(slidesWrapper).width);
        width = deleteNotDigits(getComputedStyle(slidesWrapper).width);

  let slideIndex = 1,
    offset = 0;

  // Функция удаления не чисел с исп. регул. выр.
  function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
  }

  // Первый вариант слайдера
  // Инициализация при запуске
  // showSlides(slideIndex);

  // setTotalCount(slides, total);
  // if (slides.length < 10) {
  //   total.textContent = `0${slides.length}`;
  // } else {
  //   total.textContent = slides.length;
  // }

  // function showSlides(ind) {
  //   if (ind > slides.length) {
  //     slideIndex = 1;
  //   }

  //   if (ind < 1) {
  //     slideIndex = slides.length;
  //   }

  //   slides.forEach(slide => slide.style.display = 'none');
  //   slides[slideIndex - 1].style.display = 'block';

  // setCurrentCount(slideIndex, current);
  //   // if (slides.length < 10) {
  //   if (slideIndex < 10) {
  //     current.textContent = `0${slideIndex}`;
  //   } else {
  //     current.textContent = slideIndex;
  //   }
  // }

  // function plusSlides(ind) {
  //   showSlides(slideIndex += ind);
  // }

  // prev.addEventListener('click', () => {
  //   plusSlides(-1);
  // });

  // next.addEventListener('click', () => {
  //   plusSlides(1);
  // });

  // Чтоб не выделялось при нажатии
  // prev.addEventListener('mousedown', event => {
  //   event.preventDefault();
  // });

  // next.addEventListener('mousedown', event => {
  //   event.preventDefault();
  // });

  // Второй вариант слайдера - карусель (добавить стили в css)
  function setTotalCount(slides, total) {
    if (slides.length < 10) {
      total.textContent = `0${slides.length}`;
    } else {
      total.textContent = slides.length;
    }
  }

  function setCurrentCount(ind, current) {
    if (ind < 10) {
      current.textContent = `0${ind}`;
    } else {
      current.textContent = ind;
    }
  }

  setTotalCount(slides, total);
  setCurrentCount(slideIndex, current);
  // if (slides.length < 10) {
  //   total.textContent = `0${slides.length}`;
  // } else {
  //   total.textContent = slides.length;
  // }

  // if (slideIndex < 10) {
  //   current.textContent = `0${slideIndex}`;
  // } else {
  //   current.textContent = slideIndex;
  // }

  slidesField.style.width = 100 * slides.length + '%';
  slides.forEach(slide => {
    slide.style.width = width + 'px';
  });

  next.addEventListener('click', () => {
    if (offset == width * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += width;
    }

    slidesField.style.transform = `translate(-${offset}px)`;

    // Установка номера показываемого слайдера
    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    setCurrentCount(slideIndex, current);
    // if (slideIndex < 10) {
    //   current.textContent = `0${slideIndex}`;
    // } else {
    //   current.textContent = slideIndex;
    // }

    // Точки
    setDotsOpacity(slideIndex, dots);
    // dots.forEach(dot => dot.style.opacity = 0.5);
    // dots[slideIndex - 1].style.opacity = 1;
  });

  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = width * (slides.length - 1);
    } else {
      offset -= width;
    }

    slidesField.style.transform = `translate(-${offset}px)`;

    // Установка номера показываемого слайдера
    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    setCurrentCount(slideIndex, current);
    // if (slideIndex < 10) {
    //   current.textContent = `0${slideIndex}`;
    // } else {
    //   current.textContent = slideIndex;
    // }

    // Точки
    setDotsOpacity(slideIndex, dots);
    // dots.forEach(dot => dot.style.opacity = 0.5);
    // dots[slideIndex - 1].style.opacity = 1;
  });

  // Сделаем навигацию (точки) для слайдера
  // Для всего слайдера (offer__slider) нужно pos.: rel.
  // Нужны стили css (файл styles.css из урока)
  const indicators = document.createElement('ol'),
    dots = [];
  indicators.classList.add('carousel-indicators');
  slider.append(indicators);

  function setDotsOpacity(ind, dots) {
    dots.forEach(dot => dot.style.opacity = 0.5);
    dots[ind - 1].style.opacity = 1;
  }

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.dataset.slideTo = i + 1;
    dot.classList.add('dot');

    if (i == 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);

    dots.push(dot);
  }

  // Клики на точки
  dots.forEach(dot => {
    dot.addEventListener('click', event => {
      const slideTo = event.target.dataset.slideTo;

      slideIndex = slideTo;

      offset = width * (slideTo - 1);
      slidesField.style.transform = `translate(-${offset}px)`;

      setDotsOpacity(slideIndex, dots);
      // dots.forEach(dot => dot.style.opacity = 0.5);
      // dots[slideIndex - 1].style.opacity = 1;

      setCurrentCount(slideIndex, current);
      // if (slideIndex < 10) {
      //   current.textContent = `0${slideIndex}`;
      // } else {
      //   current.textContent = slideIndex;
      // }
    });
  });
}

// module.exports = slider;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  // Tabs

  // Элементы меню (фитнес и т.д.)
  const tabs = document.querySelectorAll(tabsSelector),
        // Сами табы
        tabsContent = document.querySelectorAll(tabsContentSelector),
        // Родитель эл-ов меню для делегирования
        tabsParent = document.querySelector(tabsParentSelector);
  hideTabContent();
  // Можно без п-ов, будет отобр. первый элемент фитнес
  showTabContent();

  // Скроем все табы для начала
  function hideTabContent() {
    // Инлайн-стили
    // tabsContent.forEach(item => item.style.display = 'none');
    // С пом. классов
    tabsContent.forEach(item => {
      item.classList.add('hide');
      // Удалить класс обязательно
      item.classList.remove('show', 'fade');
    });
    // Убираем класс активности
    tabs.forEach(item => item.classList.remove(activeClass));
  }

  // Показ табов
  function showTabContent(number = 0) {
    // Инлайн-стили
    // tabsContent[number].style.display = 'block';
    // Классы
    tabsContent[number].classList.add('show', 'fade');
    tabsContent[number].classList.remove('hide');
    tabs[number].classList.add(activeClass);
  }

  // Делегирование
  tabsParent.addEventListener('click', e => {
    // Проще сначала получить
    const target = e.target;
    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        // Если то, на что мы кликнули совпадает с элементом из псевдомассива, то вызываем ф-и
        if (item == target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

// module.exports = tabs;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


function timer(selector, deadline) {
  // Timer

  // const deadline = '2021-01-12 18:58:00';

  // Расчет временных промежутков
  function getTimeRemaining(endtime) {
    const t = new Date(endtime).getTime() - Date.now(),
      // const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (24 * 60 * 60 * 1000)),
      // Может быть больше 24, поэтому берем остаток
      hours = Math.floor(t / (1000 * 60 * 60) % 24),
      minutes = Math.floor(t / (1000 * 60) % 60),
      seconds = Math.floor(t / 1000 % 60);

    return {
      'total': t,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  // Установка нулей, если нужно
  function setZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  // Установка таймера
  function setTimer(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timerInterval = setInterval(updateTimer, 1000);

    // Рекурсивный setTimeout
    // let timerInterval = setTimeout(updateTimer, 1000);

    // Чтобы верстка изначально не мигала
    // Вызвать вручную (нужно и с рекурсивным setTimeout)
    updateTimer();

    // Обновление наших часов
    function updateTimer() {

      // Получили объект
      const t = getTimeRemaining(endtime);

      // Если дедлайн прошел
      if (t.total <= 0) {
        clearInterval(timerInterval);
        // clearTimeout(timerInterval);
        days.innerHTML = setZero(0);
        hours.innerHTML = setZero(0);
        minutes.innerHTML = setZero(0);
        seconds.innerHTML = setZero(0);
      } else {
        // Записываем на страницу
        // Мой вариант
        // days.innerHTML = ('0' + t.days).slice(-2);
        // hours.innerHTML = ('0' + t.hours).slice(-2);
        // minutes.innerHTML = ('0' + t.minutes).slice(-2);
        // seconds.innerHTML = ('0' + t.seconds).slice(-2);

        // Вариант с функцией
        days.innerHTML = setZero(t.days);
        hours.innerHTML = setZero(t.hours);
        minutes.innerHTML = setZero(t.minutes);
        seconds.innerHTML = setZero(t.seconds);

        // Рекурс. setTimeout
        // timerInterval = setTimeout(updateTimer, 1000);
      }
    }
  }

  setTimer(selector, deadline);
}

// module.exports = timer;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");











document.addEventListener('DOMContentLoaded', () => {

  const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 7000);

  // Функция предварительной загрузки изображения спиннера
  function preloadImg(sources) {
    for (let src of sources) {
      let img = document.createElement('img');
      img.src = src;
    }
  }
  preloadImg(['img/form/spinner.svg']);

  // const tabs = require('./modules/tabs'),
  //       modal = require('./modules/modal'),
  //       timer = require('./modules/timer'),
  //       cards = require('./modules/cards'),
  //       calc = require('./modules/calc'),
  //       forms = require('./modules/forms'),
  //       slider = require('./modules/slider');

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.default)('[data-modal]', '.modal', modalTimerId);
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__.default)('.timer', '2021-01-30 18:58:00');
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__.default)();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__.default)(modalTimerId);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__.default)({
    container: '.offer__slider',
    prevArrow: '.offer__slider-prev',
    wrapper: '.offer__slider-wrapper',
    nextArrow: '.offer__slider-next',
    slide: '.offer__slide',
    field: '.offer__slider-inner',
    currentCounter: 'current',
    totalCounter: 'total'
  });
});

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => /* binding */ postData,
/* harmony export */   "getResource": () => /* binding */ getResource
/* harmony export */ });


const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });

  return await res.json();
};

const getResource = async url => {
  const res = await fetch(url);

  // Ошибки HTTP не переведут сост. промиса в reject
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map