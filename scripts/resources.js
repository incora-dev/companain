function filteringTagsHandler() {
  const filterTags = document.querySelectorAll(".articles_filter_tag");

  document.getElementById("all").classList.add("active");

  function setActiveTag(clickedTag) {
    filterTags.forEach((tag) => tag.classList.remove("active"));
    clickedTag.classList.add("active");

    const selectedFilter = clickedTag.id;
    console.log("Selected filter:", selectedFilter);
  }

  filterTags.forEach((tag) => {
    tag.addEventListener("click", () => {
      setActiveTag(tag);
    });
  });
}

filteringTagsHandler();
