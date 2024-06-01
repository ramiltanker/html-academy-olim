(function () {
  /**
   * Служебная функция для считывания параметров из адресной строки
   * и определения конфигурации компонента
   * @param  {string} name - имя параметра
   * @return {number} - значение параметра в адресной строке
   */
  const getUrlValue = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get(name), 10);
  };

  /**
   * Настройки аккордеона, параметры получаются из командной строки
   *
   * tabs_limit - number, максимальное количество одновременно открытых элементов,
   * по умолчанию 0 - не ограничено
   *
   * Для тестирования работы своего скрипта при разных значениях tabs_limit
   * временно переопределяйте значение переменной, хранящей этот параметр.
   * Либо можете дописыват GET-параметр с нужным значением в конец адресной строки,
   * например: ?tabs_limit=1
   */
  const settings = {
    tabsLimit: getUrlValue("tabs_limit") || 0,
  };

  /* Код компонента пишите ниже */

  const accordion = Array.from(document.querySelectorAll(".accordeon-item"));

  const openedTabs = [];

  function toggleAccordionItem() {
    if (this.classList.contains("accordeon-item--open")) {
      const index = openedTabs.indexOf(this);
      if (index !== -1) {
        openedTabs.splice(index, 1);
      }
      this.classList.remove("accordeon-item--open");
    } else if (settings.tabsLimit === 0) {
      this.classList.add("accordeon-item--open");
      openedTabs.push(this);
    } else if (openedTabs.length < settings.tabsLimit) {
      openedTabs.push(this);
      this.classList.add("accordeon-item--open");
    } else {
      const lastOpenTab = openedTabs.shift();
      lastOpenTab.classList.remove("accordeon-item--open");

      openedTabs.push(this);
      this.classList.add("accordeon-item--open");
    }
  }

  accordion.forEach((elem) => {
    const elemTitle = elem.querySelector(".accordeon-item-title");
    const toggleAccordionItemContext = toggleAccordionItem.bind(elem);
    elemTitle.addEventListener("click", toggleAccordionItemContext);
  });

  accordion.forEach((elem) => {
    const elemTitle = elem.querySelector(".accordeon-item-title");
    const toggleAccordionItemContext = toggleAccordionItem.bind(elem);
    elemTitle.removeEventListener("click", toggleAccordionItemContext);
  });
})();
