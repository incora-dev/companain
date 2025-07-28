function controlTabsHandler() {
  const tabButtons = document.querySelectorAll(".control_tab_item");
  const tabContents = document.querySelectorAll(".control_tab_content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      button.classList.add("active");
      const tabId = button.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });
}

function focusedOnMedicineAccordion() {
  const section = document.querySelector(".vets_focused_on_medicine_accordion");
  const headers = document.querySelectorAll(
    ".vets_focused_on_medicine_accordion_header"
  );

  if (!headers.length) return;

  let currentIndex = 1; // Start from 1 because we open the first manually
  let currentInterval = null;

  function resetAll() {
    headers.forEach((h) => {
      h.classList.remove("active");
      const content = h.nextElementSibling;
      if (content) {
        content.style.maxHeight = null;
        content.style.paddingTop = 0;
        content.style.paddingBottom = 0;
      }
    });
  }

  function openAccordion(index) {
    const header = headers[index];
    const content = header?.nextElementSibling;
    if (header && content) {
      header.classList.add("active");
      const contentHeight = content.scrollHeight;
      content.style.maxHeight = `${contentHeight + 10}px`;
      content.style.paddingTop = "10px";
      content.style.paddingBottom = "10px";
    }
  }

  function startInterval() {
    currentInterval = setInterval(() => {
      resetAll();
      openAccordion(currentIndex);
      currentIndex = (currentIndex + 1) % headers.length;
    }, 2000);
  }

  function stopInterval() {
    clearInterval(currentInterval);
    currentInterval = null;
    currentIndex = 0;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          resetAll();
          openAccordion(0);
          currentIndex = 1;
          startInterval();
        } else {
          stopInterval();
          resetAll();
        }
      });
    },
    { threshold: 0.45 }
  );

  observer.observe(section);
}

focusedOnMedicineAccordion();
controlTabsHandler();
