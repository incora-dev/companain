function getActiveTab() {
  const activeTab = document.querySelector(".control_tab_item.active");
  return activeTab?.dataset.tab;
}

function contactUsFormHandler() {
  const inputsIds = ["#full_name", "#email", "#role", "#company"];
  const formContainer = document.querySelector(".contact_us_form_block");
  const submitButton = formContainer.querySelector(".contact_us_submit_button");

  const emailInput = formContainer.querySelector("#email");
  emailInput.value = localStorage.getItem("CONTACT_EMAIL") || "";

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
    const activeTab = getActiveTab();

    const requiredSelectors = ["#full_name", "#email"];
    if (activeTab === "vets") {
      requiredSelectors.push("#role", "#company");
    }

    const inputsToValidate = requiredSelectors.map((selector) =>
      formContainer.querySelector(selector)
    );

    inputsToValidate.forEach((input) => {
      const label = input.closest(".input_label");
      label.classList.remove("input_error");
      label.removeAttribute("data-error");

      if (!input.value.trim()) {
        label.classList.add("input_error");
        label.setAttribute("data-error", "This field can’t be empty.");
        isValid = false;
      } else if (input.type === "email") {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(input.value.trim())) {
          label.classList.add("input_error");
          label.setAttribute("data-error", "Invalid email");
          isValid = false;
        }
      }
    });

    if (!agreementCheckbox.checked) {
      checkboxWrapper.classList.add("input_error");
      checkboxWrapper.classList.add("checkbox_error");
      checkboxWrapper.setAttribute(
        "data-error",
        "Please confirm that you have read the Privacy Policy and Terms & Conditions"
      );
      isValid = false;
    } else {
      checkboxWrapper.classList.remove("input_error");
      checkboxWrapper.classList.remove("checkbox_error");
      checkboxWrapper.removeAttribute("data-error");
    }

    return isValid;
  }

  [...allTextInputs, agreementCheckbox].forEach((input) => {
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
    const activeTab = getActiveTab();

    if (valid) {
      const formData = {};
      localStorage.removeItem("CONTACT_EMAIL");

      allTextInputs.forEach((input) => {
        const name = input.name;
        const value = input.value.trim();

        if (!name) return;

        if (
          activeTab !== "vets" &&
          (input.id === "role" || input.id === "company")
        ) {
          return;
        }

        formData[name] = value;
      });

      console.log(formData);
    }
  });
}

contactUsFormHandler();
