"use strict";

import tabs from "./modules/tabs";
import modal from "./modules/modal";
import timer from "./modules/timer";
import cards from "./modules/cards";
import calc from "./modules/calc";
import forms from "./modules/forms";
import slider from "./modules/slider";
import { openModal } from "./modules/modal";

document.addEventListener('DOMContentLoaded', () => {

  const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 7000);

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

  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  modal('[data-modal]', '.modal', modalTimerId);
  timer('.timer', '2021-01-30 18:58:00');
  cards();
  calc();
  forms(modalTimerId);
  slider({
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