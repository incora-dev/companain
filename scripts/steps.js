function homePageStepsAnimation() {
  const ORDER = ["Upload", "Analyze", "Summary", "Advice", "Monitor"];
  const sections = document.querySelectorAll(".proactive_steps");

  sections.forEach((section) => {
    function animateSteps() {
      ORDER.forEach((label, idx) => {
        const item = section.querySelector(
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
      { threshold: 0.4 }
    );

    obs.observe(section);
  });
}

homePageStepsAnimation();
