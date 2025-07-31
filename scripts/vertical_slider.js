function forParentSectionSlider() {
  const arrowUp = document.getElementById("arrow_up");
  const arrowDown = document.getElementById("arrow_down");
  const answers = document.querySelectorAll(".vertical_slider_item");
  const sliderTrackWrapper = document.getElementById(
    "vertical_slider_track_wrapper"
  );
  const sliderTrack = document.getElementById("vertical_slider_track");

  const firstSliderElementHeight = answers?.[0].offsetHeight;
  sliderTrackWrapper.style.height = firstSliderElementHeight + "px";

  let currentIndex = 0;
  const maxIndex = answers.length - 1;

  function scrollToCard(index) {
    const target = answers[index];
    if (!target) return;

    const wrapperRect = sliderTrackWrapper.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const currentScroll =
      parseFloat(getComputedStyle(sliderTrack).transform.split(",")[5]) || 0;

    const delta =
      targetRect.top +
      target.offsetHeight / 2 -
      (wrapperRect.top + wrapperRect.height / 2);

    const newScroll = currentScroll - delta;
    sliderTrack.style.transform = `translateY(${newScroll}px)`;

    answers.forEach((card) => card.classList.remove("active"));
    target.classList.add("active");

    arrowUp.style.visibility = index <= 0 ? "hidden" : "visible";
    arrowDown.style.visibility = index >= maxIndex ? "hidden" : "visible";
  }

  function handlePrev() {
    currentIndex = Math.max(currentIndex - 1, 0);
    scrollToCard(currentIndex);
  }

  function handleNext() {
    currentIndex = Math.min(currentIndex + 1, maxIndex);
    scrollToCard(currentIndex);
  }

  arrowUp.addEventListener("click", handlePrev);
  arrowDown.addEventListener("click", handleNext);

  window.addEventListener("resize", () => {
    sliderTrackWrapper.style.height = answers[0].offsetHeight + "px";
    scrollToCard(currentIndex);
  });

  window.addEventListener("load", () => {
    requestAnimationFrame(() => {
      scrollToCard(0);
    });
  });
}

forParentSectionSlider();
