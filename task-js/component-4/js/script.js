(function () {
  /**
   * Служебная функция для заполнения диапазона слайдера цветом.
   * @param {number} from - начальное значение в %% диапазона.
   * @param {number} to - конечное значение в %% диапазона.
   * @param {HTMLElement} controlSlider - Элемент управления слайдером
   */
  const fillSlider = (from, to, controlSlider) => {
    const sliderColor = "#ffffff";
    const rangeColor = "#25daa5";
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${from}%,
      ${rangeColor} ${from}%,
      ${rangeColor} ${to}%,
      ${sliderColor} ${to}%,
      ${sliderColor} 100%)`;
  };

  /* Код компонента пишите ниже */

  const sliderContainer1 = document.querySelector("#slider-1");
  const toSlider1 = sliderContainer1.querySelector(".toSlider");
  const toInput1 = sliderContainer1.querySelector(".toInput");

  const fromSlider1 = sliderContainer1.querySelector(".fromSlider");
  const fromInput1 = sliderContainer1.querySelector(".fromInput");
  fromInput1.closest(".form_control_container").hidden = true;
  fromSlider1.hidden = true;

  toInput1.addEventListener("input", () => {
    const value = Number(toInput1.value);
    toSlider1.value = value;
  });

  toSlider1.addEventListener("input", () => {
    const value = parseFloat(toSlider1.value);
    toInput1.value = value;
  });

  const sliderContainer2 = document.querySelector("#slider-2");
  const fromSlider2 = sliderContainer2.querySelector(".fromSlider");
  const toSlider2 = sliderContainer2.querySelector(".toSlider");
  const fromInput2 = sliderContainer2.querySelector(".fromInput");
  const toInput2 = sliderContainer2.querySelector(".toInput");

  function fill(from, to, slider) {
    const percentageFrom = (from / parseFloat(slider.max)) * 100;
    const percentageTo = (to / parseFloat(slider.max)) * 100;
    fillSlider(percentageFrom, percentageTo, slider);
  }

  fromInput2.addEventListener("input", () => {
    const value = parseFloat(fromInput2.value);
    fromSlider2.value = value;
    fill(value, toInput2.value, toSlider2);
  });

  toInput2.addEventListener("input", () => {
    const value = parseFloat(toInput2.value);
    toSlider2.value = value;
    fill(fromInput2.value, value, toSlider2);
  });

  fromSlider2.addEventListener("input", () => {
    const value = parseFloat(fromSlider2.value);
    fromInput2.value = value;
    fill(value, toInput2.value, toSlider2);
  });

  toSlider2.addEventListener("input", () => {
    const value = parseFloat(toSlider2.value);
    toInput2.value = value;
    fill(fromInput2.value, value, toSlider2);
  });

  const sliderContainer3 = document.querySelector("#slider-3");
  const fromSlider3 = sliderContainer3.querySelector(".fromSlider");
  const toSlider3 = sliderContainer3.querySelector(".toSlider");
  const fromInput3 = sliderContainer3.querySelector(".fromInput");
  const toInput3 = sliderContainer3.querySelector(".toInput");
  const minDiff = Number(sliderContainer3.dataset.minDiff);
  const maxDiff = Number(sliderContainer3.dataset.maxDiff);

  function updateInput(slider, input) {
    const value = parseFloat(slider.value);
    input.value = value;
  }

  function updateSlider(slider, otherSlider) {
    const value = parseFloat(slider.value);
    const otherValue = parseFloat(otherSlider.value);
    const diff = Math.abs(value - otherValue);

    if (diff > maxDiff) {
      if (value < otherValue) {
        otherSlider.value = (value + maxDiff).toString();
      } else {
        otherSlider.value = (value - maxDiff).toString();
      }
    }

    if (diff < minDiff) {
      if (value < otherValue) {
        otherSlider.value = (value + minDiff).toString();
      } else {
        otherSlider.value = (value - minDiff).toString();
      }
    }

    updateInput(fromSlider3, fromInput3);
    updateInput(toSlider3, toInput3);
  }

  fromSlider3.addEventListener("input", () => {
    updateSlider(fromSlider3, toSlider3);
  });

  toSlider3.addEventListener("input", () => {
    updateSlider(toSlider3, fromSlider3);
  });
})();
