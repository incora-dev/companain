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

  console.log({ firstSliderElementHeight });

  let currentIndex = 0;
  const maxIndex = answers.length - 1;

  function scrollToCard(index) {
    const container = document.querySelector(".vertical_slider_track_wrapper");
    const target = answers[index];

    if (!target || !container) return;

    const containerHeight = container.offsetHeight;
    const targetTop = target.offsetTop;
    const targetHeight = target.offsetHeight;

    // sliderTrack.style.paddingTop = `${parseInt(containerHeight / 3)}px`;

    const viewportHeight = window.innerHeight;
    const paddingTop = Math.min(viewportHeight * 0.11, 77);
    sliderTrack.style.paddingTop = `${parseInt(paddingTop)}px`;

    const scrollOffset = targetTop - containerHeight / 2 + targetHeight / 2;
    sliderTrack.style.transform = `translateY(-${scrollOffset}px)`;

    answers.forEach((card) => card.classList.remove("active"));
    target.classList.add("active");

    if (index <= 0) {
      arrowUp.style.visibility = "hidden";
    } else {
      arrowUp.style.visibility = "visible";
    }

    if (index >= answers.length - 1) {
      arrowDown.style.visibility = "hidden";
    } else {
      arrowDown.style.visibility = "visible";
    }
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

  scrollToCard(currentIndex);
}

forParentSectionSlider();
