function contactUsFormHandler() {
  const inputsIds = ["#full_name", "#email", "#role", "#company"];
  const formContainer = document.querySelector(".contact_us_form_block");
  const submitButton = formContainer.querySelector(".contact_us_submit_button");

  const requiredInputs = inputsIds.map((selector) =>
    formContainer.querySelector(selector)
  );
  const allTextInputs = formContainer.querySelectorAll('input[type="text"]');
  const agreementCheckbox = formContainer.querySelector(
    'input[type="checkbox"]'
  );
  const checkboxWrapper = agreementCheckbox.closest("label");

  let hasTriedToSubmit = false;

  function validateForm() {
    let isValid = true;

    requiredInputs.forEach((input) => {
      const label = input.closest(".input_label");

      if (!input.value.trim()) {
        label.classList.add("input_error");
        isValid = false;
      } else {
        label.classList.remove("input_error");
      }
    });

    if (!agreementCheckbox.checked) {
      checkboxWrapper.classList.add("checkbox_error");
      isValid = false;
    } else {
      checkboxWrapper.classList.remove("checkbox_error");
    }

    return isValid;
  }

  [...requiredInputs, agreementCheckbox].forEach((input) => {
    input.addEventListener("input", () => {
      if (hasTriedToSubmit) validateForm();
    });
    input.addEventListener("change", () => {
      if (hasTriedToSubmit) validateForm();
    });
  });

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    hasTriedToSubmit = true;
    const valid = validateForm();

    if (valid) {
      const formData = {};

      allTextInputs.forEach((input) => {
        const name = input.name;
        const value = input.value.trim();
        if (name) {
          formData[name] = value;
        }
      });

      console.log(formData);
    }
  });
}

contactUsFormHandler();
