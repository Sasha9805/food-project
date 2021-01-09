function slider() {
  // Slider

  const slides = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.getElementById('total'),
    current = document.getElementById('current'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
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

module.exports = slider;