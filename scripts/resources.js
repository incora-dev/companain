function filteringTagsHandler() {
  const filterTags = document.querySelectorAll(".articles_filter_tag");

  document.getElementById("all")?.classList.add("active");
  document.getElementById("animal_shelters")?.classList.add("active");

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

const helpMembersText = [
  "Hope Tails is a dedicated animal shelter committed to rescuing and caring for stray and abandoned animals. They provide a safe and loving environment, offering medical treatment, rehabilitation, and adoption services to help animals find their forever homes. Their team works passionately to improve animal welfare and support the community in responsible pet ownership.",
  "Hope Tails is a dedicated animal shelter committed to rescuing and caring for stray and abandoned animals. They provide a safe and loving environment, offering medical treatment, rehabilitation, and adoption services to help animals find their forever homes. Their team works passionately to improve animal welfare and support the community in responsible pet ownership.",
  "Hope Tails is a dedicated animal shelter committed to rescuing and caring for stray and abandoned animals. They provide a safe and loving environment, offering medical treatment, rehabilitation, and adoption services to help animals find their forever homes. Their team works passionately to improve animal welfare and support the community in responsible pet ownership.",
  "Hope Tails is a dedicated animal shelter committed to rescuing and caring for stray and abandoned animals. They provide a safe and loving environment, offering medical treatment, rehabilitation, and adoption services to help animals find their forever homes. Their team works passionately to improve animal welfare and support the community in responsible pet ownership.",
];

function helpMembersInfoSwitcher() {
  const helpMembers = document.querySelectorAll(
    ".help_nearby_members_list_item"
  );
  const selectedAvatar = document.querySelector(".selected_help_member_avatar");
  const selectedName = document.querySelector(".selected_help_member_name");
  const selectedInfo = document.querySelector(".selected_help_member_info");
  const selectedText = document.querySelector(".helper_member_selected_info");

  helpMembers.forEach((member, index) => {
    member.addEventListener("click", () => {
      const isAlreadyActive = member.classList.contains("active");
      if (isAlreadyActive) return;

      helpMembers.forEach((m) => m.classList.remove("active"));
      member.classList.add("active");

      const avatarSrc = member.querySelector("img").src;
      const name = member.querySelector(".member_name")?.textContent || "";
      const role = member.querySelector(".member_info")?.textContent || "";
      const bio = helpMembersText[index] || "";

      selectedAvatar.src = avatarSrc;
      selectedName.textContent = name;
      selectedInfo.textContent = role;
      selectedText.innerHTML = bio;
    });
  });

  helpMembers?.[0]?.click();
}

helpMembersInfoSwitcher();
filteringTagsHandler();
goToArticle();
articleProgressTracker();
