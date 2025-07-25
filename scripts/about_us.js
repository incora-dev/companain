const membersText = [
  "Michelle is a founder and builder driven by a lifelong love for animals and a belief that technology should serve with empathy. She grew up wanting to be a veterinarian, and that same instinct to care guides her work today. With experience across AI transformation, global business, and product development, she has led complex initiatives bridging innovation and impact. A former high-level athlete with a deep passion for health and longevity, Michelle brings grit, humility, and heart to everything she does. She started CompanAIn to reimagine the future of pet health — as AI becomes more human, meaningful care and connection become more critical than ever. She believes the future of responsible AI in healthcare begins with a strong foundation of historic and future-ready data.",
  "Sam Sheppard is a Doctor of Physical Therapy, health strategist, former D1 athlete, and longevity advocate passionate about delivering evidence-based care that puts people, and their outcomes, first. With years of experience leading clinical teams and scaling health operations, he’s helped shape forward-thinking services at the intersection of wellness, performance, and technology. At CompanAIn, Sam brings his deep clinical insight, a love for animals, and a unique perspective grounded in practice operations - understanding firsthand what patients, clinics, and care teams need to succeed.",
  "A Cornell-trained veterinarian and former college football player, Ted built one of the nation’s top equine practices before founding three successful veterinary consolidation companies, including Encore Vet Group, now home to over 68 hospitals and 16 specialties. With a passion for animals, people, and building what’s next, he brings decades of clinical and executive experience to CompanAIn.",
  "Michelle is a founder and builder driven by a lifelong love for animals and a belief that technology should serve with empathy. She grew up wanting to be a veterinarian, and that same instinct to care guides her work today. With experience across AI transformation, global business, and product development, she has led complex initiatives bridging innovation and impact. A former high-level athlete with a deep passion for health and longevity, Michelle brings grit, humility, and heart to everything she does. She started CompanAIn to reimagine the future of pet health — as AI becomes more human, meaningful care and connection become more critical than ever. She believes the future of responsible AI in healthcare begins with a strong foundation of historic and future-ready data.",
];

function membersInfoSwitcher() {
  const members = document.querySelectorAll(".our_team_members_list_item");
  const selectedAvatar = document.querySelector(".selected_member_avatar");
  const selectedName = document.querySelector(".selected_member_name");
  const selectedInfo = document.querySelector(".selected_member_info");
  const selectedText = document.querySelector(".member_selected_info");

  members.forEach((member, index) => {
    member.addEventListener("click", () => {
      const isAlreadyActive = member.classList.contains("active");
      if (isAlreadyActive) return;

      members.forEach((m) => m.classList.remove("active"));
      member.classList.add("active");

      const avatarSrc = member.querySelector("img").src;
      const name = member.querySelector(".member_name")?.textContent || "";
      const role = member.querySelector(".member_info")?.textContent || "";
      const bio = membersText[index] || "";

      selectedAvatar.src = avatarSrc;
      selectedName.textContent = name;
      selectedInfo.textContent = role;
      selectedText.textContent = bio;
    });
  });

  members?.[0]?.click();
}

function partnersFormHandler() {
  const inputsIds = ["#full_name", "#email", "#role", "#company"];
  const formContainer = document.querySelector(".partner_with_us_form");
  const submitButton = formContainer.querySelector(".partners_submit_button");

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

membersInfoSwitcher();
partnersFormHandler();
