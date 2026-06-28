// bird ko neeche girna chaiye
// keypress pe bird ko jump karana

const bird = document.querySelector(".bird-png");
const game = document.querySelector(".game");

let birdTop = 200;
let gravity = 2;

setInterval(() => {
  if (isGameOver) return;
  birdTop += gravity;
  bird.style.top = `${birdTop}px`;
  if(birdTop>game.clientHeight || birdTop<0)
    gameOver()
}, 20);

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    birdTop -= 60;
    bird.style.top = `${birdTop}px`;
  }
});

function createPipe() {
  if (isGameOver) return;
  const pipeTop = document.createElement("div");
  const pipeBottom = document.createElement("div");
  pipeTop.className = "pipe";
  pipeBottom.className = "pipe";

  let gap = 100;
  let gameHeight = game.clientHeight;
  let maxHeight = gameHeight - gap - 70;
  let topPipeHeight = Math.floor(Math.random() * maxHeight) + 50;
  let bottomPipeHeight = maxHeight - topPipeHeight - gap;
  pipeTop.style.height = `${topPipeHeight}px`;
  pipeBottom.style.height = `${bottomPipeHeight}px`;
  pipeTop.style.top = 0;
  pipeBottom.style.bottom = 0;
  let pipeLeft = game.clientWidth;
  pipeTop.style.left = `${pipeLeft}px`;
  pipeBottom.style.left = `${pipeLeft}px`;

  //   append
  game.append(pipeTop, pipeBottom);

  let move = setInterval(() => {
    pipeLeft -= 2;
    pipeTop.style.left = `${pipeLeft+1}px`;
    pipeBottom.style.left = `${pipeLeft+1}px`;

    // didn't understand
    let birdRect = bird.getBoundingClientRect();
    let topRect = pipeTop.getBoundingClientRect();
    let bottomRect = pipeBottom.getBoundingClientRect();
    if (
      birdRect.right > topRect.left &&
      birdRect.left < topRect.right &&
      (birdRect.top < topRect.bottom || birdRect.bottom > bottomRect.top)
    ) {
      gameOver();
      clearInterval(move);
    }
    console.log(birdRect);
    if (pipeLeft < -40) {
      pipeTop.remove();
      pipeBottom.remove();
      clearInterval(move);
    }
  }, 20);
}
setInterval(createPipe, 3000);

let isGameOver = false;
function gameOver() {
  if (isGameOver === true) return;
  isGameOver = true;
  alert("your game is over");
  location.reload();
}