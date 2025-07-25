function faqAccordions() {
  const headers = document.querySelectorAll(".faq_accordion_header");

  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      const isOpen = header.classList.contains("active");

      headers.forEach((h) => {
        h.classList.remove("active");
        h.nextElementSibling.style.maxHeight = null;
        h.nextElementSibling.style.paddingTop = 0;
        h.nextElementSibling.style.paddingBottom = 0;
      });

      if (!isOpen) {
        header.classList.add("active");

        const contentHeight = content.scrollHeight + 10;
        content.style.maxHeight = contentHeight + "px";
      }
    });
  });
}

faqAccordions();
