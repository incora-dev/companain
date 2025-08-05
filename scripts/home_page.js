function smarPetAnimations() {
  const headers = document.querySelectorAll(".smart_pet_accordion_header");
  const smartPetImageContainer = document.getElementById(
    "smart_pet_img_wrapper"
  );
  const smartPetImage = document.getElementById("smart_pet_img");

  function switchAcordion(index) {
    const header = headers?.[index];
    const content = header.nextElementSibling;
    const parentItem = header.closest(".smart_pet_accordion_item");

    parentItem?.classList.add("active");

    content.style.maxHeight = content.scrollHeight + 30 + "px";
    content.style.paddingTop = "24px";

    setTimeout(() => {
      smartPetImage.src = `assets/smart_pet_care/image_${index}.png`;
      smartPetImageContainer.classList.add("fade");
    }, 400);
  }

  requestAnimationFrame(() => {
    switchAcordion(0);
  });

  headers.forEach((header, headerIdx) => {
    header.addEventListener("click", () => {
      const isOpen = header
        .closest(".smart_pet_accordion_item")
        ?.classList.contains("active");

      headers.forEach((h) => {
        const parent = h.closest(".smart_pet_accordion_item");
        parent?.classList.remove("active");

        h.nextElementSibling.style.maxHeight = null;
        h.nextElementSibling.style.paddingTop = 0;

        smartPetImageContainer.classList.remove("fade");
      });

      if (!isOpen) {
        switchAcordion(headerIdx);
      }
    });
  });
}
function homePageStepsAnimaiton() {
  const ORDER = ["Upload", "Analyze", "Summary", "Advice", "Monitor"];
  const section = document.querySelector(".proactive_steps");

  function animateSteps() {
    ORDER.forEach((label, idx) => {
      const item = document.querySelector(
        `.proactive_steps_item [data-label="${label}"]`
      )?.parentElement;
      if (item) {
        setTimeout(() => item.classList.add("active"), idx * 1500);
      }
    });
  }

  const obs = new IntersectionObserver(
    ([entry], o) => {
      if (entry.isIntersecting) {
        animateSteps();
        o.unobserve(section);
      }
    },
    {
      threshold: 0.4,
    }
  );

  obs.observe(section);
}

function stickyHomePageSection() {
  if (window.innerWidth > 900) {
    const section = document.querySelector(".footsteps_section");
    const stickyContainer = document.querySelector(
      ".footsteps_section__container"
    );
    const scrollable = document.querySelector(
      ".footsteps_scrolling_section_middle"
    );
    const list = document.querySelector(".footsteps_scrolling_section_list");
    const items = document.querySelectorAll(
      ".footsteps_scrolling_section_item"
    );

    const itemScrollDurationVH = 100;
    const totalScrollVH = items.length * itemScrollDurationVH;

    section.style.height = `${totalScrollVH}vh`;

    const maxTranslate = list.scrollHeight - scrollable.clientHeight;

    let ticking = false;

    console.log("sticky JS logic applyed");

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sectionTop = section.offsetTop;
          const scrollY = window.scrollY;
          const scrollProgressRaw =
            (scrollY - sectionTop + 1) /
            (section.offsetHeight - window.innerHeight);
          const progress = Math.min(1, Math.max(0, scrollProgressRaw));
          const translateY = progress * maxTranslate;
          // Move list inside sticky container
          list.style.transform = `translateY(-${translateY * 2.2}px)`;
          ticking = false;
        });

        ticking = true;
      }
    });
  }
}

smarPetAnimations();
homePageStepsAnimaiton();
stickyHomePageSection();
