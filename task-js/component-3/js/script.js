(function () {
  /* Код компонента пишите здесь */
  const form = document.querySelector("#booking-form");
  const phoneInput = form.querySelector("#phone");
  const checkinDate = form.querySelector("#checkin-date");
  const checkoutDate = form.querySelector("#checkout-date");

  const adultsInput = form.querySelector("#adults");
  const childrenInput = form.querySelector("#children");
  const singleRoomCheckbox = form.querySelector("#radio-1");
  const doubleRoomCheckbox = form.querySelector("#radio-2");
  const familyRoomCheckbox = form.querySelector("#radio-3");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const phone = phoneInput.value;

    const phoneRegex = /^\+7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/;

    if (phoneRegex.test(phone)) {
      phoneInput.classList.remove("field-error");
      phoneInput.classList.add("field-correct");
    } else {
      phoneInput.classList.remove("field-correct");
      phoneInput.classList.add("field-error");
    }

    const checkinDateValue = checkinDate.value.trim();
    const checkoutDateValue = checkoutDate.value.trim();

    const dateRegex = /^(?:\d{4}-\d{2}-\d{2}|\d{2}\.\d{2}\.\d{4})$/;

    const checkinDateValid = dateRegex.test(checkinDateValue);
    const checkoutDateValid = dateRegex.test(checkoutDateValue);

    let isDataValid = true;

    function convertToDate(dateString) {
      const [first, second, third] = dateString.split(/[.-]/);
      if (first.length === 4) {
        return new Date(first, second - 1, third);
      } else {
        return new Date(third, second - 1, first);
      }
    }

    if (!checkinDateValid || !checkoutDateValid) {
      isDataValid = false;
    } else {
      const checkin = convertToDate(checkinDateValue);
      const checkout = convertToDate(checkoutDateValue);

      const differenceInMilliseconds = Math.abs(checkout - checkin);
      const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

      if (differenceInDays < 4 || checkout < checkin) {
        isDataValid = false;
      }
    }

    if (isDataValid) {
      checkinDate.classList.remove("field-error");
      checkoutDate.classList.remove("field-error");
      checkinDate.classList.add("field-correct");
      checkoutDate.classList.add("field-correct");
    } else {
      checkinDate.classList.remove("field-correct");
      checkoutDate.classList.remove("field-correct");
      checkinDate.classList.add("field-error");
      checkoutDate.classList.add("field-error");
    }

    const adultsCount = Number(adultsInput.value);
    const childrenCount = Number(childrenInput.value);
    const singleRoomChecked = singleRoomCheckbox.checked;
    const doubleRoomChecked = doubleRoomCheckbox.checked;
    const familyRoomChecked = familyRoomCheckbox.checked;

    let isValid = true;

    if (adultsCount < 1 || (singleRoomChecked && adultsCount > 1)) {
      isValid = false;
    } else if (doubleRoomChecked && adultsCount !== 2) {
      isValid = false;
    } else if (familyRoomChecked && (adultsCount < 2 || childrenCount < 1)) {
      isValid = false;
    } else if (childrenCount > adultsCount) {
      isValid = false;
    }

    if (isValid) {
      adultsInput.classList.remove("field-error");
      childrenInput.classList.remove("field-error");
      adultsInput.classList.add("field-correct");
      childrenInput.classList.add("field-correct");
    } else {
      adultsInput.classList.remove("field-correct");
      childrenInput.classList.remove("field-correct");
      adultsInput.classList.add("field-error");
      childrenInput.classList.add("field-error");
    }
  });
})();
