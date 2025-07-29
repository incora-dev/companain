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

  function setPlatform(platform) {
    if (platform === "ios") {
      ios_btn.classList.add("active");
      android_btn.classList.remove("active");
    } else if (platform === "android") {
      android_btn.classList.add("active");
      ios_btn.classList.remove("active");
    }
  }

  return {
    resetForm,
    setPlatform,
  };
}

function betaModalHandler() {
  const modal = document.getElementById("join_beta_modal");
  const open_modal_btn = document.getElementById("join_beta_btn");
  const home_early_access_btn = document.getElementById("home_early_access");
  const footer_open_modal_btn = document.getElementById(
    "footer_early_access_btn"
  );
  const cta_open_modal_btn = document.getElementById("cta_section_get_started");
  const close_modal_btn = document.getElementById("close_beta_modal_button");
  const modalBody = document.querySelector(".join_beta_modal_body");
  const iosDownloadBtn = document.getElementById("app_store_download");
  const androidDownloadBtn = document.getElementById("play_market_download");

  [iosDownloadBtn, androidDownloadBtn].forEach((btn) => {
    btn?.addEventListener("click", () => {
      const platform = btn.dataset.platform;
      formManager.setPlatform(platform);
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  [
    open_modal_btn,
    cta_open_modal_btn,
    footer_open_modal_btn,
    home_early_access_btn,
  ]
    .filter(Boolean)
    .forEach((el) => {
      el.addEventListener("click", () => {
        modal.classList.add("open");
        document.body.style.overflow = "hidden";
      });
    });

  const formManager = betaFormHandler();

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
    formManager.resetForm();
  }

  modal.addEventListener("click", (event) => {
    if (!modalBody.contains(event.target)) {
      closeModal();
    }
  });

  close_modal_btn.addEventListener("click", closeModal);
}

function injectBetaModal() {
  const wrapper = document.querySelector(".wrapper");
  if (!wrapper) return;

  const currentScript = document.currentScript;
  const scriptSrc = currentScript?.src;

  const imagePath = scriptSrc.split("scripts")[0] + "assets/largeLogo.svg";
  const pagesPath = scriptSrc.split("scripts")[0] + "pages/Policy";

  const modalHTML = `
    <div id="join_beta_modal" class="join_beta_modal">
      <div class="join_beta_modal__container">
        <div class="join_beta_modal_body">

        <div class="modal_paw_container_1">
              <object
              type="image/svg+xml"
              data="assets/paw.svg"
            ></object>
            </div>
            <div class="modal_paw_container_2">
              <object
              type="image/svg+xml"
              data="assets/paw.svg"
            ></object>
            </div>
            <div class="modal_paw_container_3">
              <object
              type="image/svg+xml"
              data="assets/paw.svg"
            ></object>
            </div>
            <div class="modal_paw_container_4">
              <object
              type="image/svg+xml"
              data="assets/paw.svg"
            ></object>
            </div>
            <div class="modal_paw_container_5">
              <object
              type="image/svg+xml"
              data="assets/paw.svg"
            ></object>
            </div>

          <section class="join_beta_modal_body_logo_section">
            <img class="logo_section_info_image" src="${imagePath}" alt="large_logo" />
            <div class="logo_section_info_block">
              <div class="logo_section_info_block_title">
                Join <br /> the CompanAIn Beta Program
              </div>
              <div class="logo_section_info_block_subtitle">Help us build the future of pet care</div>
            </div>
          </section>
          <section class="join_beta_modal_body_form_section">
            <button class="close_beta_modal_button" id="close_beta_modal_button">
              <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="m480-444.62-209.69 209.7q-7.23 7.23-17.5 7.42-10.27.19-17.89-7.42-7.61-7.62-7.61-17.7 0-10.07 7.61-17.69L444.62-480l-209.7-209.69q-7.23-7.23-7.42-17.5-.19-10.27 7.42-17.89 7.62-7.61 17.7-7.61 10.07 0 17.69 7.61L480-515.38l209.69-209.7q7.23-7.23 17.5-7.42 10.27-.19 17.89 7.42 7.61 7.62 7.61 17.7 0 10.07-7.61 17.69L515.38-480l209.7 209.69q7.23 7.23 7.42 17.5.19 10.27-7.42 17.89-7.62 7.61-17.7 7.61-10.07 0-17.69-7.61L480-444.62Z"/></svg>
            </button>

            <div class="logo_section_form_block_title">Sign Up to Beta Test</div>
            <div class="logo_section_block_form">
              <label style="grid-area: beta_form_block_1" class="input_label">
                <div>Full Name <span class="required_field">*</span></div>
                <input placeholder="John Paw" class="partner_input" type="text" name="name" id="full_name">
              </label>
              <label style="grid-area: beta_form_block_2" class="input_label">
                <div>Email Adress <span class="required_field">*</span></div>
                <input placeholder="johnpaw@email.com" class="partner_input" type="text" name="email" id="email">
              </label>
              <label style="grid-area: beta_form_block_3" class="input_label">
                <div>Platform</div>
                <button class="platform_switch_button active" id="ios_btn" data-value="ios">iOS</button>
              </label>
              <label style="grid-area: beta_form_block_4" class="input_label">
                <div>&nbsp</div>
                <button class="platform_switch_button" id="android_btn" data-value="android">Android</button>
              </label>
              <label style="grid-area: beta_form_block_5" class="input_label">
                <div>Why are you interested?</div>
                <input placeholder="Tell us a few words…" class="partner_input" type="text" name="interest" id="interest_reason">
              </label>
              <label style="grid-area: beta_form_block_6">
                <input type="checkbox" class="custom_checkbox" />
                <span class="custom_checkmark">
                  <svg class="checkbox_icon" width="16" height="16" viewBox="0 0 18 17" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.41 9.24L5.66 12.51L15.24 3.07" fill="none" stroke="#6137CD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
                <span class="checkbox_label">
                  I agree to the <a href="${pagesPath}/PrivacyPolicy.html">Privacy Policy</a> and <a href="${pagesPath}/TermsAndConditions.html">Terms & Conditions</a> and consent to participate in the beta.
                </span>
              </label>
            </div>
            <div class="logo_section_form_submit_btn_wrapper">
              <button id="beta_form_submit_btn" class="beta_form_submit_btn">Join the beta</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  `;

  wrapper.insertAdjacentHTML("beforeend", modalHTML);
}

injectBetaModal();
betaFormHandler();
betaModalHandler();
