function modal() {
  // Modal

  const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal');

  function openModal(e) {
    modal.classList.add('show');
    modal.classList.remove('hide');
    // Можно исп. toggle
    // modal.classList.toggle('show');

    document.body.style.overflow = 'hidden';

    // Чтобы не открывалось по таймеру, если польз. открыл вручную
    clearTimeout(modalTimerId);
    // Чтобы при срабатывании таймера не сработало открытие при докрутке
    // e - undefined
    if (!e) {
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    // Можно исп. toggle
    // modal.classList.toggle('show');

    document.body.style.overflow = '';
  }

  modalTrigger.forEach(item => {
    item.addEventListener('click', openModal);
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
      closeModal();
    }
  });

  // Закрытие по клику на esc
  document.addEventListener('keydown', e => {
    if (e.code == 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  // Мод. окно откроется через какое-то время
  const modalTimerId = setTimeout(openModal, 7000);

  // Мод.окно откр. при докрутке до конца
  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
    }
  }
  window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;