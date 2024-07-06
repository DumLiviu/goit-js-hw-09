const buttons =
  document.querySelectorAll("button");

const startButton = buttons[0];
const stopButton = buttons[1];

let colorChangingInterval = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changingStart() {
  startButton.disabled = true;
  colorChangingInterval = setInterval(() => {
    document.body.style.background =
      getRandomHexColor();
  }, 1000);
}

function changingStop() {
  clearInterval(colorChangingInterval);
  startButton.disabled = false;
}

startButton.addEventListener(
  "click",
  changingStart
);
stopButton.addEventListener(
  "click",
  changingStop
);
