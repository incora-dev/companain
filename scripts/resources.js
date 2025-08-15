function filteringTagsHandler() {
  const filterTags = document.querySelectorAll(".articles_filter_tag");

  document.getElementById("all")?.classList.add("active");

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

function goToArticle() {
  const top_articles = document.querySelectorAll(".top_article_item");
  const default_articles = document.querySelectorAll(".articles_list_item");
  const explore_article_item = document.querySelectorAll(
    ".explore_article_item"
  );

  [...top_articles, ...default_articles, ...explore_article_item].forEach(
    (article) => {
      article.addEventListener("click", () => {
        const id = article.dataset.id;
        console.log({
          article_id: id,
        });
        window.location.href = `Article.html`;
      });
    }
  );
}

function articleProgressTracker() {
  const headings = document.querySelectorAll(
    "#section_heading_1, .article_content_subtitle"
  );
  const trackerLinks = document.querySelectorAll(
    ".article_progress_tracker_title"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          trackerLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`
            );
          });
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -60% 0px",
      threshold: 0,
    }
  );

  headings.forEach((h) => observer.observe(h));
}

filteringTagsHandler();
goToArticle();
articleProgressTracker();
