function sidebarHandler() {
  const sidebar = document.getElementById("menu__list");
  const burger = document.getElementById("nav_burger");
  const cross = document.getElementById("close_button");

  function openSidebar() {
    sidebar.classList.add("show");
  }

  function closeSidebar() {
    sidebar.classList.remove("show");
  }

  burger.addEventListener("click", openSidebar);
  cross.addEventListener("click", closeSidebar);
}

sidebarHandler();
