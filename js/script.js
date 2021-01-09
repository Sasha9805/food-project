"use strict";

document.addEventListener('DOMContentLoaded', () => {

  // Функция предварительной загрузки изображения спиннера
  function preloadImg(sources) {
    for (let src of sources) {
      let img = document.createElement('img');
      img.src = src;
    }
  }
  preloadImg(['img/form/spinner.svg']);

  const tabs = require('./modules/tabs'),
        modal = require('./modules/modal'),
        timer = require('./modules/timer'),
        cards = require('./modules/cards'),
        calc = require('./modules/calc'),
        forms = require('./modules/forms'),
        slider = require('./modules/slider');

  tabs();
  modal();
  timer();
  cards();
  calc();
  forms();
  slider();
});