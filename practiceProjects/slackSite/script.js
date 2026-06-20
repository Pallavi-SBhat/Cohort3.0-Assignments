const cards = document.querySelector(".cards");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const storyCard = document.querySelectorAll(".story-card");
const storyCards = document.querySelector(".story-cards");
function activateCard(activeCard) {
  storyCard.forEach((card) => {
    card.classList.remove("active");
    const video = card.querySelector("video");
    video.pause();
    video.currentTime = 0;
  });
  activeCard.classList.add("active");
  const activateVideo = activeCard.querySelector("video");
  activateVideo.play();
}
activateCard(storyCard[0]);
storyCard.forEach((card) => {
  card.addEventListener("mouseover", () => {
    activateCard(card);
  });
});

console.log(storyCard)
next.addEventListener("click", () => {
  cards.scrollBy({
    left: 392,
    behavior: "smooth",
  });
});
prev.addEventListener("click", () => {
  cards.scrollBy({
    left: -392,
    behavior: "smooth",
  });
});
