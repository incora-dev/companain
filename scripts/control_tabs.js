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

controlTabsHandler();
