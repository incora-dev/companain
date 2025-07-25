function betaFormHandler() {
  const inputsIds = ["#full_name", "#email"];
  const formContainer = document.querySelector(".logo_section_block_form");
  const submitButton = document.querySelector(".beta_form_submit_btn");

  const requiredInputs = inputsIds.map((selector) =>
    formContainer.querySelector(selector)
  );
  const allTextInputs = formContainer.querySelectorAll('input[type="text"]');
  const agreementCheckbox = formContainer.querySelector(
    'input[type="checkbox"]'
  );
  const checkboxWrapper = agreementCheckbox.closest("label");

  const ios_btn = document.getElementById("ios_btn");
  const android_btn = document.getElementById("android_btn");

  ios_btn.addEventListener("click", () => {
    ios_btn.classList.add("active");
    android_btn.classList.remove("active");
  });
  android_btn.addEventListener("click", () => {
    android_btn.classList.add("active");
    ios_btn.classList.remove("active");
  });

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

      formData.agreed = agreementCheckbox.checked;
      formData.platform = ios_btn.classList.contains("active")
        ? "ios"
        : "android";

      console.log("beta form submitted:", formData);
    }
  });

  function resetForm() {
    allTextInputs.forEach((input) => {
      input.value = "";
      const label = input.closest(".input_label");
      label?.classList.remove("input_error");
    });

    agreementCheckbox.checked = false;
    checkboxWrapper.classList.remove("checkbox_error");

    android_btn.classList.remove("active");
    ios_btn.classList.add("active");
    hasTriedToSubmit = false;
  }

  return {
    resetForm,
  };
}

function betaModalHandler() {
  const modal = document.getElementById("join_beta_modal");
  const open_modal_btn = document.getElementById("join_beta_btn");
  const footer_open_modal_btn = document.getElementById(
    "footer_early_access_btn"
  );
  const close_modal_btn = document.getElementById("close_beta_modal_button");
  const modalBody = document.querySelector(".join_beta_modal_body");

  const formManager = betaFormHandler();

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
    formManager.resetForm();
  }

  open_modal_btn.addEventListener("click", () => {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  });

  footer_open_modal_btn.addEventListener("click", () => {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  });

  modal.addEventListener("click", (event) => {
    if (!modalBody.contains(event.target)) {
      closeModal();
    }
  });

  close_modal_btn.addEventListener("click", closeModal);
}

betaFormHandler();
betaModalHandler();
