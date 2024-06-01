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
   * Настройки слайдера, параметры получаются из командной строки
   * pagination - boolean, отображает пагинацию
   * loop - boolean, зацикливает слайдер
   *
   * Для тестирования работы своего скрипта при разных значениях параметров временно
   * переопределяйте значение переменных, хранящих эти параметр.
   * Либо можете дописыват гет-параметры с нужным значением в конец адресной строки,
   * например: ?pagination=1&loop=0
   */
  const settings = {
    pagination: !!getUrlValue("pagination"),
    loop: !!getUrlValue("loop"),
  };

  /* Код компонента пишите ниже */

  const sliderPagination = document.querySelector(".slider-pagination");
  const paginationBtns = Array.from(
    document.querySelectorAll(".slider-pagination-item")
  );

  if (settings.pagination) {
    sliderPagination.classList.add("slider-pagination--shown");
  }

  const slides = Array.from(document.querySelectorAll(".slider-item"));
  const prevBtn = document.querySelector(".slider-toggle--prev");
  const nextBtn = document.querySelector(".slider-toggle--next");
  let currentSlideIndex = slides.findIndex((slide) =>
    slide.classList.contains("slider-item--current")
  );

  if (settings.loop) {
    prevBtn.disabled = false;
  }

  const checkPaginationBtn = (currentIndex) => {
    if (settings.loop) {
      return;
    }

    console.log("123213");
    if (currentIndex !== 0) {
      prevBtn.disabled = false;
    } else {
      prevBtn.disabled = true;
    }
    if (currentIndex === slides.length - 1) {
      nextBtn.disabled = true;
    } else {
      nextBtn.disabled = false;
    }
  };

  function setSlide() {
    paginationBtns[currentSlideIndex].disabled = false;
    slides[currentSlideIndex].classList.remove("slider-item--current");
    const slideIndex = Number(this.textContent) - 1;
    checkPaginationBtn(slideIndex);
    paginationBtns[slideIndex].disabled = true;
    currentSlideIndex = slideIndex;
    slides[slideIndex].classList.add("slider-item--current");
  }

  function disablePaginationBtn(prevIndex, nextIndex) {
    paginationBtns[prevIndex].disabled = false;
    paginationBtns[nextIndex].disabled = true;
  }

  const nextSlide = () => {
    slides[currentSlideIndex].classList.remove("slider-item--current");
    let nextIndex = 0;

    if (settings.loop && currentSlideIndex === slides.length - 1) {
      nextIndex = 0;
    } else {
      if (currentSlideIndex < slides.length - 1) {
        nextIndex = currentSlideIndex + 1;
      }
    }
    checkPaginationBtn(nextIndex);
    disablePaginationBtn(currentSlideIndex, nextIndex);
    currentSlideIndex = nextIndex;
    slides[currentSlideIndex].classList.add("slider-item--current");
  };

  nextBtn.addEventListener("click", nextSlide);

  const prevSlide = () => {
    slides[currentSlideIndex].classList.remove("slider-item--current");
    let nextIndex = 0;

    if (settings.loop && currentSlideIndex === 0) {
      nextIndex = slides.length - 1;
    } else {
      if (currentSlideIndex !== 0) {
        nextIndex = currentSlideIndex - 1;
      }
    }
    checkPaginationBtn(nextIndex);
    disablePaginationBtn(currentSlideIndex, nextIndex);
    currentSlideIndex = nextIndex;
    slides[currentSlideIndex].classList.add("slider-item--current");
  };

  prevBtn.addEventListener("click", prevSlide);

  paginationBtns.forEach((elem) => {
    elem.addEventListener("click", setSlide);
  });
})();
