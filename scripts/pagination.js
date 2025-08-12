function paginationHandler() {
  const paginationPages = document.querySelectorAll(".pagination_page");
  const prevBtn = document.getElementById("pagination_prev");
  const nextBtn = document.getElementById("pagination_next");

  let currentPage = Number(
    document.querySelector(".pagination_page.active").id
  );

  function updateActivePage(newPage) {
    paginationPages.forEach((page) => page.classList.remove("active"));
    const targetPage = document.getElementById(String(newPage));
    if (targetPage) {
      targetPage.classList.add("active");
      currentPage = newPage;
      console.log({ newPage });
    }
  }

  paginationPages.forEach((page) => {
    page.addEventListener("click", () => {
      updateActivePage(Number(page.id));
    });
  });

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      updateActivePage(currentPage - 1);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < paginationPages.length) {
      updateActivePage(currentPage + 1);
    }
  });
}

paginationHandler();
