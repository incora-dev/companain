const feedbacks = [
  {
    rating: 5,
    feedback:
      "CompanAIn helped me understand my dog’s blood test results without any vet jargon. Now I feel confident managing her care!",
    userPhoto: "./assets/feedbacks_section/users/woman_2.png",
    userName: "Emily R.",
    feedbackDate: "JUN 10, 2025",
    userType: "Pet Owner",
  },
  {
    rating: 5,
    feedback:
      "The AI summaries save me time and effort. It’s like having a smart assistant that gives clear insights fast — super helpful in a busy clinic.",
    userPhoto: "./assets/feedbacks_section/users/men.png",
    userName: "Dr. Michael T.",
    feedbackDate: "MAY 23, 2025",
    userType: "Veterinarian",
  },
  {
    rating: 5,
    feedback:
      "I am able to connect the dots between her medical history and current health. I love how easy it is to upload and track all my cats’ health documents in one place.",
    userPhoto: "./assets/feedbacks_section/users/woman.png",
    userName: "Sofiia L.",
    feedbackDate: "OCT 10, 2024",
    userType: "Pet Owner",
  },
];

const sliderDots = document.getElementById("sliderDots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const sliderWrapper = document.getElementById("sliderWrapper");
let feedbackCards = sliderWrapper.querySelectorAll(".feedback_card");
const sliderTrack = document.getElementById("sliderTrack");

function renderFeedbackCards(feedbacks) {
  sliderTrack.innerHTML = ""; // clear existing

  feedbacks.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("feedback_card");

    // Create rating stars
    const ratingContainer = document.createElement("div");
    ratingContainer.classList.add("feedback_rating");
    for (let i = 0; i < item.rating; i++) {
      const star = document.createElement("object");
      star.setAttribute("type", "image/svg+xml");
      star.setAttribute("data", "assets/feedbacks_section/rating.svg");
      ratingContainer.appendChild(star);
    }

    // Feedback text
    const feedbackText = document.createElement("div");
    feedbackText.classList.add("feedback_text");
    feedbackText.textContent = item.feedback;

    const feedbackCardInfo = document.createElement("div");
    feedbackCardInfo.classList.add("feedback_card_info");
    feedbackCardInfo.appendChild(ratingContainer);
    feedbackCardInfo.appendChild(feedbackText);

    // User section
    const userImg = document.createElement("img");
    userImg.src = item.userPhoto;
    userImg.alt = item.userName;

    const userTag = document.createElement("span");
    userTag.classList.add("feedback_user_tag");
    userTag.textContent = item.userType;

    const userName = document.createElement("div");
    userName.classList.add("feedback_card_user_name");
    userName.textContent = item.userName;
    userName.appendChild(userTag);

    const userDate = document.createElement("span");
    userDate.classList.add("feedback_date");
    userDate.textContent = item.feedbackDate;

    const userInfo = document.createElement("div");
    userInfo.classList.add("feedback_card_user_info");
    userInfo.appendChild(userName);
    userInfo.appendChild(userDate);

    const userBlock = document.createElement("div");
    userBlock.classList.add("feedback_card_user");
    userBlock.appendChild(userImg);
    userBlock.appendChild(userInfo);

    // Final card
    card.appendChild(feedbackCardInfo);
    card.appendChild(userBlock);

    sliderTrack.appendChild(card);
  });
}

let currentIndex = 1;
const maxIndex = feedbacks.length - 1;

const handlePrev = () => {
  currentIndex = Math.max(currentIndex - 1, 0);
  updateSlider();
};

const handleNext = () => {
  currentIndex = Math.min(currentIndex + 1, maxIndex);
  updateSlider();
};

function scrollToCard(index) {
  const cardWidth = feedbackCards[0].offsetWidth;
  const gap = parseFloat(getComputedStyle(sliderTrack).gap) || 0;
  const totalCardWidth = cardWidth + gap;

  const offset = (index - 1) * totalCardWidth;

  sliderTrack.style.transform = `translateX(${offset * -1}px)`;

  feedbackCards.forEach((card) => card.classList.remove("active_card"));
  feedbackCards[index]?.classList.add("active_card");
}

function updateSlider() {
  feedbackCards = sliderTrack.querySelectorAll(".feedback_card");
  scrollToCard(currentIndex);
  renderDots();
}

function renderDots() {
  sliderDots.innerHTML = "";

  feedbackCards.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("slider_dot");
    if (index === currentIndex) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
      currentIndex = index;
      updateSlider();
    });

    sliderDots.appendChild(dot);
  });
}

prevBtn.addEventListener("click", handlePrev);
nextBtn.addEventListener("click", handleNext);

renderFeedbackCards(feedbacks);
updateSlider();
