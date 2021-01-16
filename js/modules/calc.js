"use strict";

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
export default calc;