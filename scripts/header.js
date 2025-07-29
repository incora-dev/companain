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

function highlightActivePage() {
  const currentPath = window.location.pathname.replace(/\/index\.html$/, "/"); // normalize index.html
  const links = document.querySelectorAll(".menu__link");

  links.forEach((link) => {
    const linkPath = new URL(link.href).pathname;

    if (currentPath === linkPath || currentPath.endsWith(linkPath)) {
      link.classList.add("active");
    }
  });
}

highlightActivePage();
sidebarHandler();
