const main = document.querySelector("main");
const btn = document.querySelector("button");
const box = document.createElement("div");
const timer = document.querySelector("#timer");
const scoree = document.querySelector("#score");
const overlay = document.querySelector(".overlay");
box.classList.add("box");
main.append(box);
box.style.display = "none";

function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  return `rgb(${r},${g},${b})`;
}

let isClickable = true;

function randomPosition() {
  box.style.display = "block";

  let maxH = main.clientHeight - box.offsetHeight;
  let maxW = main.clientWidth - box.offsetWidth;
  let rX = Math.floor(Math.random() * maxW);
  let ry = Math.floor(Math.random() * maxH);

  box.style.top = `${ry}px`;
  box.style.left = `${rX}px`;

  box.style.backgroundColor = randomColor();
  isClickable = true;
}

let time = 0;
let score = 0;
btn.disabled = false;

btn.addEventListener("click", () => {
  time = 0;
  timer.textContent = time;
  score = 0;
  scoree.textContent = score;
  btn.disabled = true;
  btn.classList.add("disable");
  btn.textContent = "Playing";
  randomPosition();

  let interval = setInterval(() => {
    time++;
    timer.textContent = time;
    randomPosition();
  }, 1000);

  setTimeout(() => {
    clearInterval(interval);

    overlay.style.display = "flex";
    isClickable = false;

    setTimeout(() => {
      overlay.style.display = "none";
      box.style.display = "none";
      btn.disabled = false;
      btn.textContent = "Start";
      btn.classList.remove("disable");
    }, 3000);
  }, 10000);
});

box.addEventListener("click", () => {
  if (!isClickable) return;
  score++;
  scoree.textContent = score;
  isClickable = false;
});