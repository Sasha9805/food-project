function tabs() {
  // Tabs

  // Элементы меню (фитнес и т.д.)
  const tabs = document.querySelectorAll('.tabheader__item'),
    // Сами табы
    tabsContent = document.querySelectorAll('.tabcontent'),
    // Родитель эл-ов меню для делегирования
    tabsParent = document.querySelector('.tabheader__items');
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
    tabs.forEach(item => item.classList.remove('tabheader__item_active'));
  }

  // Показ табов
  function showTabContent(number = 0) {
    // Инлайн-стили
    // tabsContent[number].style.display = 'block';
    // Классы
    tabsContent[number].classList.add('show', 'fade');
    tabsContent[number].classList.remove('hide');
    tabs[number].classList.add('tabheader__item_active');
  }

  // Делегирование
  tabsParent.addEventListener('click', e => {
    // Проще сначала получить
    const target = e.target;
    if (target && target.classList.contains('tabheader__item')) {
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

module.exports = tabs;