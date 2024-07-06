const flatpickr = window.flatpickr;

const datetimePicker = document.getElementById(
  "datetime-picker"
);
const startButton = document.getElementById(
  "start-button"
);
const daysElement = document.querySelector(
  "[data-days]"
);
const hoursElement = document.querySelector(
  "[data-hours]"
);
const minutesElement = document.querySelector(
  "[data-minutes]"
);
const secondsElement = document.querySelector(
  "[data-seconds]"
);

let countdownInterval = null;
let selectedDate = null;

flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      alert("Please choose a date in the future");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

startButton.addEventListener("click", () => {
  startCountdown();
  startButton.disabled = true;
});

function startCountdown() {
  countdownInterval = setInterval(
    updateCountdown,
    1000
  );
}

function updateCountdown() {
  const now = new Date().getTime();
  const distance = selectedDate - now;

  if (distance < 0) {
    clearInterval(countdownInterval);
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    return;
  }

  const { days, hours, minutes, seconds } =
    convertMs(distance);

  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent =
    addLeadingZero(hours);
  minutesElement.textContent =
    addLeadingZero(minutes);
  secondsElement.textContent =
    addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(
    (ms % hour) / minute
  );
  const seconds = Math.floor(
    (ms % minute) / second
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}
